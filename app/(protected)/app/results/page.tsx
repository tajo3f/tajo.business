import { BarChart3, Link2, QrCode, Sparkles } from "lucide-react";

export default function ResultsPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Resultados
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
        Acompanhe o que está funcionando.
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted">
        O MVP já reserva este espaço para analytics. A persistência de eventos,
        cliques e criações entra no módulo de banco seguinte.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          [Sparkles, "Criações", "0"],
          [QrCode, "QR Codes", "0"],
          [Link2, "Cliques", "0"],
          [BarChart3, "Conversões", "0"],
        ].map(([Icon, label, value]) => {
          const C = Icon as typeof Sparkles;
          return (
            <div key={String(label)} className="tajo-card rounded-[28px] p-6">
              <C size={20} />
              <strong className="mt-10 block text-4xl tracking-[-0.05em]">
                {String(value)}
              </strong>
              <p className="mt-2 text-sm text-muted">{String(label)}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-[30px] border border-dashed border-ui p-8 text-center text-sm text-muted">
        Gráficos serão habilitados quando a migration de analytics estiver instalada.
      </div>
    </div>
  );
}
