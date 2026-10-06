import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getWorkspaceContext, hasActiveAccess } from "@/lib/workspace";

export default async function ActiveAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getWorkspaceContext();

  if (!ctx) redirect("/onboarding");
  if (!hasActiveAccess(ctx)) redirect("/billing");

  return (
    <AppShell
      organization={ctx.organization.name}
      role={ctx.membership.role}
      plan={ctx.plan?.name || "Plano"}
    >
      {children}
    </AppShell>
  );
}
