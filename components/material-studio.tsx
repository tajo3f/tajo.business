"use client";

import { Download, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";
import { Button, Field, Input, SecondaryButton } from "@/components/ui";

type Format = "story" | "square";

const formats: Record<Format, { label: string; width: number; height: number }> = {
  story: { label: "Story 9:16", width: 540, height: 960 },
  square: { label: "Post 1:1", width: 540, height: 540 },
};

export function MaterialStudio({
  brandName,
  primaryColor,
  secondaryColor,
}: {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<Format>("story");
  const [headline, setHeadline] = useState("SUA PRÓXIMA ESCOLHA COMEÇA AQUI.");
  const [subtitle, setSubtitle] = useState(
    "Uma oferta preparada para quem valoriza qualidade e praticidade."
  );
  const [cta, setCta] = useState("FALE COM A GENTE");
  const [badge, setBadge] = useState("NOVIDADE");
  const [downloading, setDownloading] = useState(false);

  const size = formats[format];

  const previewScale = useMemo(() => (format === "story" ? 0.44 : 0.62), [format]);

  async function download() {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `tajo-one-${format}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  function smartCopy() {
    setHeadline("TRANSFORME INTERESSE EM AÇÃO.");
    setSubtitle(
      "Apresente sua oferta com clareza, destaque o valor e facilite o próximo passo."
    );
    setCta("CHAME NO WHATSAPP");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[390px_1fr]">
      <aside className="tajo-card rounded-[30px] p-5">
        <div className="flex gap-2">
          {(Object.keys(formats) as Format[]).map((key) => (
            <button
              key={key}
              onClick={() => setFormat(key)}
              className={`rounded-xl px-3 py-2 text-xs font-bold ${
                format === key ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-soft"
              }`}
            >
              {formats[key].label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Selo">
            <Input value={badge} onChange={(e) => setBadge(e.target.value)} maxLength={30} />
          </Field>
          <Field label="Headline">
            <Input value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={90} />
          </Field>
          <Field label="Texto">
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="focus-ring min-h-28 rounded-2xl border border-ui bg-surface p-4 text-sm"
              maxLength={180}
            />
          </Field>
          <Field label="CTA">
            <Input value={cta} onChange={(e) => setCta(e.target.value)} maxLength={40} />
          </Field>

          <SecondaryButton onClick={smartCopy}>
            <Sparkles size={17} />
            Melhorar copy
          </SecondaryButton>

          <Button onClick={download} disabled={downloading}>
            <Download size={17} />
            {downloading ? "Gerando..." : "Baixar PNG"}
          </Button>
        </div>
      </aside>

      <section className="overflow-hidden rounded-[30px] border border-ui bg-soft p-4 md:p-8">
        <div className="mx-auto flex min-h-[600px] items-center justify-center overflow-auto">
          <div
            style={{
              width: size.width * previewScale,
              height: size.height * previewScale,
            }}
            className="relative shrink-0"
          >
            <div
              ref={ref}
              style={{
                width: size.width,
                height: size.height,
                background: primaryColor,
                color: secondaryColor,
                transform: `scale(${previewScale})`,
                transformOrigin: "top left",
              }}
              className="relative overflow-hidden p-12"
            >
              <div
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full border"
                style={{ borderColor: secondaryColor, opacity: 0.22 }}
              />
              <div
                className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full"
                style={{ background: secondaryColor, opacity: 0.08 }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <strong className="text-xl tracking-[-0.04em]">{brandName}</strong>
                  <span
                    className="rounded-full border px-4 py-2 text-xs font-black tracking-[0.16em]"
                    style={{ borderColor: secondaryColor }}
                  >
                    {badge}
                  </span>
                </div>

                <div className="my-auto">
                  <h2
                    className={`max-w-[460px] font-black leading-[0.9] tracking-[-0.07em] ${
                      format === "story" ? "text-6xl" : "text-5xl"
                    }`}
                  >
                    {headline}
                  </h2>
                  <p className="mt-6 max-w-[430px] text-xl leading-8 opacity-75">
                    {subtitle}
                  </p>
                </div>

                <div
                  className="inline-flex w-fit rounded-full px-6 py-4 text-sm font-black tracking-[0.08em]"
                  style={{ background: secondaryColor, color: primaryColor }}
                >
                  {cta}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
