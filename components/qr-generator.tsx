"use client";

import QRCode from "qrcode";
import { Copy, Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, Field, Input, SecondaryButton } from "@/components/ui";

type Kind = "url" | "whatsapp" | "pix" | "wifi";

export function QrGenerator() {
  const [kind, setKind] = useState<Kind>("whatsapp");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("Olá! Gostaria de saber mais.");
  const [wifiPassword, setWifiPassword] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const payload = useMemo(() => {
    const raw = value.trim();

    if (kind === "whatsapp") {
      const phone = raw.replace(/\D/g, "");
      if (!phone) return "";
      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    if (kind === "wifi") {
      if (!raw) return "";
      return `WIFI:T:WPA;S:${raw.replace(/([\\;,":])/g, "\\$1")};P:${wifiPassword.replace(
        /([\\;,":])/g,
        "\\$1"
      )};;`;
    }

    return raw;
  }, [kind, message, value, wifiPassword]);

  useEffect(() => {
    let active = true;

    async function generate() {
      if (!payload) {
        setDataUrl("");
        return;
      }

      const url = await QRCode.toDataURL(payload, {
        width: 900,
        margin: 2,
        errorCorrectionLevel: "H",
      });

      if (active) setDataUrl(url);
    }

    generate();
    return () => {
      active = false;
    };
  }, [payload]);

  async function copy() {
    if (payload) await navigator.clipboard.writeText(payload);
  }

  function download() {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `tajo-one-qr-${kind}.png`;
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <section className="tajo-card rounded-[30px] p-5 md:p-7">
        <div className="flex flex-wrap gap-2">
          {(["whatsapp", "url", "pix", "wifi"] as Kind[]).map((item) => (
            <button
              key={item}
              onClick={() => setKind(item)}
              className={`rounded-xl px-3 py-2 text-xs font-bold uppercase ${
                kind === item ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-soft"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-5">
          <Field
            label={
              kind === "whatsapp"
                ? "Número com DDI"
                : kind === "wifi"
                  ? "Nome da rede"
                  : kind === "pix"
                    ? "Pix Copia e Cola / chave"
                    : "URL"
            }
          >
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                kind === "whatsapp"
                  ? "5527999999999"
                  : kind === "wifi"
                    ? "WiFi da empresa"
                    : "Cole aqui"
              }
            />
          </Field>

          {kind === "whatsapp" ? (
            <Field label="Mensagem inicial">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus-ring min-h-28 rounded-2xl border border-ui bg-surface p-4 text-sm"
              />
            </Field>
          ) : null}

          {kind === "wifi" ? (
            <Field label="Senha do Wi-Fi">
              <Input
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
              />
            </Field>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <SecondaryButton onClick={copy} disabled={!payload}>
              <Copy size={17} />
              Copiar destino
            </SecondaryButton>
            <Button onClick={download} disabled={!dataUrl}>
              <Download size={17} />
              Baixar QR
            </Button>
          </div>
        </div>
      </section>

      <aside className="flex min-h-[420px] items-center justify-center rounded-[30px] bg-[var(--foreground)] p-7 text-[var(--background)]">
        {dataUrl ? (
          <div className="w-full text-center">
            <div className="mx-auto max-w-[270px] rounded-[28px] bg-white p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dataUrl} alt="QR Code gerado" className="w-full" />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] opacity-60">
              Pronto para usar
            </p>
          </div>
        ) : (
          <p className="max-w-xs text-center text-sm leading-6 opacity-60">
            Preencha os dados para visualizar o QR Code.
          </p>
        )}
      </aside>
    </div>
  );
}
