import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Palette,
  QrCode,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: Sparkles,
    title: "Material Studio",
    text: "Crie peças comerciais consistentes com a identidade da sua empresa.",
  },
  {
    icon: QrCode,
    title: "QR & Links",
    text: "WhatsApp, Pix, cardápio, Wi-Fi, Instagram e outros destinos.",
  },
  {
    icon: Star,
    title: "Google Review",
    text: "Facilite o acesso dos clientes à página oficial de avaliação.",
  },
  {
    icon: Palette,
    title: "Brand Brain",
    text: "Cores, tom e estilo salvos para manter tudo com a mesma marca.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden rounded-2xl border border-ui bg-surface px-4 py-2.5 text-sm font-bold sm:block"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="rounded-2xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-bold text-[var(--background)]"
          >
            Criar conta
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-24 pt-14 md:pt-24">
        <div className="tajo-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ui bg-surface px-3 py-2 text-xs font-bold">
              <BadgeCheck size={15} />
              Central comercial para pequenos negócios
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-8xl">
              Sua marca pronta para vender.
              <span className="text-muted"> Em um só lugar.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg">
              Materiais comerciais, QR Codes, links, avaliações e identidade da
              empresa em uma experiência criada para quem precisa vender — não
              aprender ferramentas complicadas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[var(--foreground)] px-6 font-bold text-[var(--background)]"
              >
                Criar minha conta <ArrowRight size={18} />
              </Link>
              <a
                href="#recursos"
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-ui bg-surface px-6 font-bold"
              >
                Ver recursos
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-4" id="recursos">
            {features.map((item) => (
              <article
                key={item.title}
                className="tajo-card rounded-[28px] p-5"
              >
                <item.icon size={23} />
                <h2 className="mt-7 text-lg font-black tracking-[-0.03em]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ui bg-[var(--foreground)] px-5 py-20 text-[var(--background)]">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <Store size={28} />
            <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Um sistema que entende o objetivo antes da ferramenta.
            </h2>
          </div>
          <div className="grid gap-3 text-sm md:text-base">
            {[
              "Quero divulgar uma promoção.",
              "Quero levar clientes para o WhatsApp.",
              "Quero conseguir mais avaliações.",
              "Quero criar um material profissional.",
            ].map((text, i) => (
              <div
                key={text}
                className="rounded-2xl border border-white/15 bg-white/5 p-5"
              >
                <span className="mr-3 text-white/50">0{i + 1}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <Logo />
        <p>TAJO ONE • Soluções digitais para negócios.</p>
      </footer>
    </main>
  );
}
