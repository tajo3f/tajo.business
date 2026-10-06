import { QrGenerator } from "@/components/qr-generator";

export default function QrPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">QR & Links</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Transforme qualquer destino em acesso rápido.
      </h1>
      <p className="mb-8 mt-3 max-w-2xl leading-7 text-muted">
        WhatsApp, Pix, URL ou Wi-Fi. O QR é gerado localmente no navegador.
      </p>
      <QrGenerator />
    </div>
  );
}
