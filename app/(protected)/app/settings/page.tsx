import { Badge } from "@/components/ui";
import { getWorkspaceContext } from "@/lib/workspace";
import { formatBRL } from "@/lib/utils";

export default async function SettingsPage() {
  const ctx = await getWorkspaceContext();

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Empresa</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Conta e assinatura.
      </h1>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="tajo-card rounded-[30px] p-6">
          <p className="text-sm text-muted">Empresa</p>
          <h2 className="mt-2 text-2xl font-black">{ctx?.organization.name}</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="text-muted">Slug</dt>
              <dd className="mt-1 font-semibold">{ctx?.organization.slug}</dd>
            </div>
            <div>
              <dt className="text-muted">WhatsApp</dt>
              <dd className="mt-1 font-semibold">{ctx?.organization.whatsapp || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted">Perfil</dt>
              <dd className="mt-1 font-semibold">{ctx?.membership.role}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[30px] bg-[var(--foreground)] p-6 text-[var(--background)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm opacity-60">Plano</p>
              <h2 className="mt-2 text-2xl font-black">{ctx?.plan?.name || "—"}</h2>
            </div>
            <Badge tone="success">{ctx?.subscription?.status || "—"}</Badge>
          </div>
          <p className="mt-10 text-4xl font-black tracking-[-0.05em]">
            {formatBRL(ctx?.plan?.price_cents)}
            <span className="text-sm font-normal opacity-60"> / mês</span>
          </p>
          <p className="mt-3 text-xs opacity-60">
            Próximo vencimento:{" "}
            {ctx?.subscription?.current_period_end
              ? new Intl.DateTimeFormat("pt-BR").format(
                  new Date(ctx.subscription.current_period_end)
                )
              : "—"}
          </p>
        </section>
      </div>
    </div>
  );
}
