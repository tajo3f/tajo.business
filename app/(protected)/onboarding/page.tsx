import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { OnboardingForm } from "@/components/onboarding-form";
import { getWorkspaceContext, hasActiveAccess } from "@/lib/workspace";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Configurar empresa" };

export default async function OnboardingPage() {
  const ctx = await getWorkspaceContext();

  if (ctx) {
    redirect(hasActiveAccess(ctx) ? "/app" : "/billing");
  }

  const supabase = await createClient();
  const [{ data: niches }, { data: plans }] = await Promise.all([
    supabase
      .from("niches")
      .select("slug, name, description")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("plans")
      .select("slug, name, description, price_cents")
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-6xl py-12">
        <div className="mb-9 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Etapa 1 de 2
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Vamos montar seu espaço.
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Essas informações criam sua empresa, identidade inicial e assinatura
            no TAJO ONE.
          </p>
        </div>

        <OnboardingForm niches={niches ?? []} plans={plans ?? []} />
      </div>
    </main>
  );
}
