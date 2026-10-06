"use client";

import QRCode from "qrcode";
import { Copy, ExternalLink, Search, Star } from "lucide-react";
import { useState } from "react";
import { Button, Field, Input, SecondaryButton } from "@/components/ui";

export function ReviewGenerator() {
  const [input, setInput] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [qr, setQr] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setMessage(null);
    setReviewUrl("");
    setQr("");

    try {
      const response = await fetch("/api/reviews/normalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Não foi possível gerar.");
        return;
      }

      setPlaceId(data.placeId);
      setReviewUrl(data.reviewUrl);
      setQr(
        await QRCode.toDataURL(data.reviewUrl, {
          width: 900,
          margin: 2,
          errorCorrectionLevel: "H",
        })
      );
    } catch {
      setMessage("Falha ao gerar o link.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (reviewUrl) await navigator.clipboard.writeText(reviewUrl);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
      <section className="tajo-card rounded-[30px] p-5 md:p-7">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-soft">
          <Star size={22} />
        </div>

        <Field
          label="Link do Google ou Place ID"
          hint="Você pode colar um Place ID ChI... ou um link oficial do Google."
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://share.google/... ou ChI..."
          />
        </Field>

        <Button onClick={generate} disabled={loading || input.trim().length < 3} className="mt-5">
          <Search size={17} />
          {loading ? "Analisando..." : "Gerar acesso de avaliação"}
        </Button>

        {message ? (
          <div className="mt-5 rounded-2xl border border-ui bg-soft p-4 text-sm leading-6 text-muted">
            {message}
          </div>
        ) : null}

        {reviewUrl ? (
          <div className="mt-7 rounded-[24px] border border-ui bg-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Place ID
            </p>
            <p className="mt-2 break-all text-sm font-bold">{placeId}</p>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Link direto
            </p>
            <p className="mt-2 break-all text-sm">{reviewUrl}</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <SecondaryButton onClick={copy}>
                <Copy size={17} />
                Copiar
              </SecondaryButton>
              <a
                href={reviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[var(--foreground)] px-5 text-sm font-bold text-[var(--background)]"
              >
                Testar <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ) : null}
      </section>

      <aside className="flex min-h-[440px] items-center justify-center rounded-[30px] bg-[var(--foreground)] p-7 text-[var(--background)]">
        {qr ? (
          <div className="text-center">
            <div className="mx-auto max-w-[260px] rounded-[28px] bg-white p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="QR para avaliação no Google" className="w-full" />
            </div>
            <p className="mt-5 text-sm font-bold">Avalie-nos no Google</p>
            <p className="mt-1 text-xs opacity-60">Aponte a câmera para continuar.</p>
          </div>
        ) : (
          <div className="max-w-xs text-center">
            <Star className="mx-auto opacity-40" size={40} />
            <p className="mt-4 text-sm leading-6 opacity-60">
              O QR da avaliação aparecerá aqui quando o Place ID for identificado.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
