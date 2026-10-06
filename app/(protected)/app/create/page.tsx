import Link from "next/link";
import { ArrowRight, Palette, QrCode, Sparkles, Star } from "lucide-react";

const options = [
  {
    href: "/app/materials",
    icon: Sparkles,
    eyebrow: "DIVULGAÇÃO",
    title: "Quero criar um material comercial",
    text: "Monte uma peça com sua identidade e faça o download.",
  },
  {
    href: "/app/qr",
    icon: QrCode,
    eyebrow: "CONVERSÃO",
    title: "Quero levar o cliente para algum lugar",
    text: "Gere QR Code para WhatsApp, Pix, site, cardápio ou Wi-Fi.",
  },
  {
    href: "/app/reviews",
    icon: Star,
    eyebrow: "REPUTAÇÃO",
    title: "Quero facilitar avaliações no Google",
    text: "Transforme o Place ID em um acesso direto para avaliação.",
  },
  {
    href: "/app/brand",
    icon: Palette,
    eyebrow: "IDENTIDADE",
    title: "Quero organizar minha marca",
    text: "Configure o Brand Brain para manter consistência.",
  },
];

export default function CreatePage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Criar</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Qual é o objetivo?
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted">
        Você escolhe o resultado. O sistema leva você para a ferramenta adequada.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {options.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tajo-card group rounded-[30px] p-6 md:p-8"
          >
            <div className="flex items-center justify-between">
              <item.icon size={25} />
              <ArrowRight size={20} className="transition group-hover:translate-x-1" />
            </div>
            <p className="mt-14 text-xs font-bold tracking-[0.18em] text-muted">
              {item.eyebrow}
            </p>
            <h2 className="mt-2 max-w-md text-2xl font-black tracking-[-0.04em]">
              {item.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
