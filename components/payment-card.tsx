"use client";

import { CheckCircle2, Copy, ExternalLink, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge, Button, SecondaryButton } from "@/components/ui";
import { formatBRL } from "@/lib/utils";

type Payment = {
  reference_code: string;
  amount_cents: number;
  status:
    | "awaiting_payment"
    | "under_review"
    | "approved"
    | "rejected"
    | "expired";
  created_at: string;
} | null;

export function PaymentCard({
  organizationName,
  planName,
  payment,
}: {
  organizationName: string;
  planName: string;
  payment: Payment;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const whatsapp = process.env.NEXT_PUBLIC_TAJO_WHATSAPP || "";
  const pix = process.env.NEXT_PUBLIC_TAJO_PIX_KEY || "";

  const waUrl = useMemo(() => {
    if (!payment || !whatsapp) return "#";
    const text = [
      "Olá, TAJO!",
      "",
      "Realizei o pagamento do TAJO ONE.",
      "",
      `Empresa: ${organizationName}`,
      `Plano: ${planName}`,
      `Referência: ${payment.reference_code}`,
      `Valor: ${formatBRL(payment.amount_cents)}`,
      "",
      "Estou enviando o comprovante abaixo.",
    ].join("\n");

    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
  }, [organizationName, payment, planName, whatsapp]);

  async function copy(value: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setMessage("Copiado.");
  }

  async function markSent() {
    if (!payment) return;

    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.rpc("mark_payment_sent", {
      p_reference_code: payment.reference_code,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Comprovante marcado como enviado. Agora aguardamos a conferência.");
    setLoading(false);
    router.refresh();
  }

  if (!payment) {
    return (
      <div className="tajo-card rounded-[32px] p-6">
        Não encontramos uma referência de pagamento para esta empresa.
      </div>
    );
  }

  const reviewing = payment.status === "under_review";

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="tajo-card rounded-[32px] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              {planName}
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
              {formatBRL(payment.amount_cents)}
            </h2>
          </div>
          <Badge tone={reviewing ? "warning" : "neutral"}>
            {reviewing ? "Em análise" : "Aguardando pagamento"}
          </Badge>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl bg-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Referência
            </p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <strong className="text-lg">{payment.reference_code}</strong>
              <button
                onClick={() => copy(payment.reference_code)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-ui bg-surface"
                aria-label="Copiar referência"
              >
                <Copy size={17} />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Chave Pix
            </p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <strong className="break-all">{pix || "Configure NEXT_PUBLIC_TAJO_PIX_KEY"}</strong>
              <button
                onClick={() => copy(pix)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ui bg-surface"
                aria-label="Copiar Pix"
              >
                <Copy size={17} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[var(--foreground)] px-5 text-sm font-bold text-[var(--background)]"
          >
            Enviar comprovante <ExternalLink size={16} />
          </a>

          {!reviewing ? (
            <SecondaryButton onClick={markSent} disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Já enviei
            </SecondaryButton>
          ) : null}
        </div>

        {message ? <p className="mt-4 text-sm text-muted">{message}</p> : null}
      </div>

      <aside className="rounded-[32px] bg-[var(--foreground)] p-6 text-[var(--background)]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-60">
          Liberação
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
          {reviewing ? "Estamos conferindo." : "Envie seu comprovante."}
        </h3>
        <p className="mt-3 text-sm leading-6 opacity-70">
          O status da assinatura é validado no banco. Alterações feitas no
          navegador não liberam os recursos protegidos.
        </p>

        {reviewing ? (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm">
            <LoaderCircle className="animate-spin" size={18} />
            Aguardando aprovação da TAJO
          </div>
        ) : null}
      </aside>
    </section>
  );
}
