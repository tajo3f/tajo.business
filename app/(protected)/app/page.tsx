import Link from "next/link";
import {
  ArrowUpRight,
  Palette,
  QrCode,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import { getWorkspaceContext } from "@/lib/workspace";

const actions = [
  {
    href: "/app/materials",
    title: "Criar material",
    text: "Story, post ou peça comercial em poucos passos.",
    icon: Sparkles,
  },
  {
    href: "/app/qr",
    title: "Criar QR & link",
    text: "Leve clientes para WhatsApp, Pix, cardápio e mais.",
    icon: QrCode,
  },
  {
    href: "/app/reviews",
    title: "Conseguir avaliações",
    text: "Gere o acesso direto para a avaliação do Google.",
    icon: Star,
  },
  {
    href: "/app/brand",
    title: "Ajustar minha marca",
    text: "Cores, estilo e identidade usados nas criações.",
    icon: Palette,
  },
];

export default async function DashboardPage() {
  const ctx = await getWorkspaceContext();

  return (
    <div>
      <section className="rounded-[36px] bg-[var(--foreground)] p-6 text-[var(--background)] md:p-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
            <WandSparkles size={15} />
            Central comercial
          </div>
          <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
            O que a {ctx?.organization.name} precisa hoje?
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 opacity-70 md:text-base">
            Escolha um objetivo. O TAJO ONE organiza a ferramenta certa para você
            chegar ao resultado.
          </p>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tajo-card group min-h-56 rounded-[28px] p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft">
                <item.icon size={21} />
              </span>
              <ArrowUpRight
                size={20}
                className="text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <h2 className="mt-16 text-xl font-black tracking-[-0.04em]">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["Materiais criados", "0"],
          ["QR Codes gerados", "0"],
          ["Links preparados", "0"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[28px] border border-ui bg-surface p-6">
            <p className="text-sm text-muted">{label}</p>
            <strong className="mt-2 block text-4xl tracking-[-0.05em]">{value}</strong>
            <p className="mt-3 text-xs text-muted">
              Histórico persistente entra na próxima migration.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
