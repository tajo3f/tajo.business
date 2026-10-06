"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[TAJO ONE] global error", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#090a08] p-5 text-white">
          <section className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-black uppercase tracking-[.18em] text-white/45">TAJO ONE</p>
            <h1 className="mt-4 text-3xl font-black tracking-[-.05em]">Não conseguimos carregar esta tela.</h1>
            <p className="mt-4 text-sm leading-6 text-white/55">Tente novamente. Se o problema continuar, confira os Runtime Logs da Vercel e as variáveis do Supabase.</p>
            {error.digest ? <p className="mt-4 rounded-xl bg-white/5 p-3 text-xs text-white/40">Referência: {error.digest}</p> : null}
            <div className="mt-6 flex gap-3">
              <button onClick={() => reset()} className="rounded-2xl bg-[#baff29] px-5 py-3 text-sm font-black text-black">Tentar novamente</button>
              <button onClick={() => window.location.assign("/")} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black">Ir para o início</button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
