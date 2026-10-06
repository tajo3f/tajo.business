import "server-only";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export type SubscriptionStatus =
  | "pending_payment"
  | "under_review"
  | "active"
  | "grace_period"
  | "suspended"
  | "cancelled";

export type WorkspaceContext = {
  organization: {
    id: string;
    name: string;
    slug: string;
    whatsapp: string | null;
    business_email: string | null;
    niche_id: string | null;
  };
  membership: { role: "owner" | "admin" | "editor" | "viewer" };
  subscription: {
    id: string;
    status: SubscriptionStatus;
    current_period_end: string | null;
    grace_until: string | null;
    plan_id: string;
  } | null;
  plan: {
    id: string;
    slug: string;
    name: string;
    price_cents: number;
  } | null;
  brand: {
    brand_name: string | null;
    slogan: string | null;
    logo_path: string | null;
    primary_color: string;
    secondary_color: string;
    accent_color: string | null;
    visual_style: string | null;
  } | null;
};

export async function getWorkspaceContext(): Promise<WorkspaceContext | null> {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: memberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .limit(1);

  if (membershipError) {
    console.error("[workspace] membership lookup failed", membershipError);
    return null;
  }

  const membership = memberships?.[0];
  if (!membership) return null;

  const [orgResult, subscriptionResult, brandResult] = await Promise.all([
    supabase
      .from("organizations")
      .select("id, name, slug, whatsapp, business_email, niche_id")
      .eq("id", membership.organization_id)
      .maybeSingle(),
    supabase
      .from("subscriptions")
      .select("id, status, current_period_end, grace_until, plan_id")
      .eq("organization_id", membership.organization_id)
      .maybeSingle(),
    supabase
      .from("brand_profiles")
      .select("brand_name, slogan, logo_path, primary_color, secondary_color, accent_color, visual_style")
      .eq("organization_id", membership.organization_id)
      .maybeSingle(),
  ]);

  if (orgResult.error) {
    console.error("[workspace] organization lookup failed", orgResult.error);
    return null;
  }

  if (!orgResult.data) return null;

  let plan = null;
  if (subscriptionResult.data?.plan_id) {
    const planResult = await supabase
      .from("plans")
      .select("id, slug, name, price_cents")
      .eq("id", subscriptionResult.data.plan_id)
      .maybeSingle();
    if (!planResult.error) plan = planResult.data ?? null;
  }

  return {
    organization: orgResult.data,
    membership: { role: membership.role },
    subscription: subscriptionResult.data ?? null,
    plan,
    brand: brandResult.data ?? null,
  } as WorkspaceContext;
}

export function hasActiveAccess(ctx: WorkspaceContext | null) {
  if (!ctx?.subscription) return false;
  const now = Date.now();
  const s = ctx.subscription;

  if (s.status === "active" && s.current_period_end && new Date(s.current_period_end).getTime() > now) return true;
  if (s.status === "grace_period" && s.grace_until && new Date(s.grace_until).getTime() > now) return true;
  return false;
}
