import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PaymentCard } from "@/components/payment-card";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaceContext, hasActiveAccess } from "@/lib/workspace";

export const metadata = { title: "Assinatura" };

export default async function BillingPage() {
  const ctx = await getWorkspaceContext();
  if (!ctx) redirect("/onboarding");
  if (hasActiveAccess(ctx)) redirect("/app");

  const supabase = await createClient();
  const { data: payment } = await supabase
    .from("payment_submissions")
    .select("reference_code, amount_cents, status, created_at")
    .eq("organization_id", ctx.organization.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-5xl py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
          Etapa 2 de 2
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
          Falta só confirmar sua assinatura.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Faça o pagamento, envie o comprovante pelo WhatsApp e marque abaixo.
          A TAJO fará a liberação manual da sua conta.
        </p>

        <div className="mt-9">
          <PaymentCard
            organizationName={ctx.organization.name}
            planName={ctx.plan?.name || "Plano"}
            payment={payment}
          />
        </div>
      </div>
    </main>
  );
}
