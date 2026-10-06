import { ArrowUpRight, BarChart3, QrCode, Sparkles, Star, WandSparkles } from "lucide-react";

export function HeroPreview() {
  const cards = [
    [Sparkles, "Criar material", "Story, post e peças"],
    [QrCode, "Gerar QR", "WhatsApp, Pix e mais"],
    [Star, "Avaliações", "Google Review"],
    [BarChart3, "Resultados", "Visualizar progresso"],
  ];

  return (
    <div className="relative mx-auto mt-16 max-w-6xl md:mt-20">
      <div className="orbit-ring absolute -inset-5 rounded-[44px] opacity-35 blur-2xl" />
      <div className="device-shadow relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0c0d0b] p-2">
        <div className="overflow-hidden rounded-[27px] bg-[#11120f] text-white">
          <div className="flex h-12 items-center justify-between border-b border-white/8 px-5">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6a65]"/><span className="h-2.5 w-2.5 rounded-full bg-[#ffd34d]"/><span className="h-2.5 w-2.5 rounded-full bg-[#6de685]"/></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">TAJO ONE / Central</span>
            <span className="h-2 w-12 rounded-full bg-white/10" />
          </div>
          <div className="grid min-h-[540px] md:grid-cols-[200px_1fr]">
            <aside className="hidden border-r border-white/8 p-4 md:block">
              <div className="mb-8 flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[10px] font-black text-black">T1</div><span className="text-xs font-black">TAJO ONE</span></div>
              {["Início","Criar","Materiais","QR & Links","Avaliações","Minha marca"].map((item,i)=><div key={item} className={`mb-1 rounded-xl px-3 py-2.5 text-xs font-bold ${i===0?"bg-white text-black":"text-white/45"}`}>{item}</div>)}
            </aside>
            <main className="relative overflow-hidden p-5 md:p-8">
              <div className="absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-[#baff29]/10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold"><WandSparkles size={13}/> CENTRAL COMERCIAL</div>
                <h3 className="mt-5 max-w-3xl text-3xl font-black leading-[.95] tracking-[-0.06em] md:text-5xl">O que sua empresa precisa fazer hoje?</h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {cards.map(([Icon,title,text],i)=>{ const C=Icon as typeof Sparkles; return <div key={String(title)} className={`rounded-[20px] border p-4 ${i===0?"border-[#baff29]/30 bg-[#baff29]/10":"border-white/8 bg-white/[0.035]"}`}><div className="flex items-start justify-between"><C size={18}/><ArrowUpRight size={14} className="text-white/35"/></div><p className="mt-8 text-xs font-black">{String(title)}</p><p className="mt-1 text-[10px] text-white/42">{String(text)}</p></div>})}
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_.7fr]">
                  <div className="rounded-[22px] border border-white/8 bg-white/[0.035] p-5"><div className="flex items-center justify-between"><span className="text-xs font-bold">Campanha da semana</span><span className="rounded-full bg-[#baff29] px-2 py-1 text-[9px] font-black text-black">ATIVA</span></div><div className="mt-7 h-2 w-full overflow-hidden rounded-full bg-white/8"><div className="h-full w-[72%] rounded-full bg-[#baff29]"/></div><div className="mt-4 grid grid-cols-3 gap-3">{["Story","WhatsApp","QR"].map(item=><div key={item} className="rounded-xl bg-white/[0.04] p-3 text-[10px] text-white/55">{item}</div>)}</div></div>
                  <div className="rounded-[22px] bg-[#725cff] p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55">Brand Brain</p><p className="mt-3 text-xl font-black tracking-[-.05em]">Uma marca.<br/>Uma direção.</p><div className="mt-9 flex gap-2"><span className="h-7 w-7 rounded-full bg-[#baff29]"/><span className="h-7 w-7 rounded-full bg-white"/><span className="h-7 w-7 rounded-full bg-black/60"/></div></div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className="float-soft absolute -left-2 top-[34%] hidden rounded-2xl border border-ui bg-[var(--surface-solid)] p-3 shadow-xl md:block"><p className="text-[9px] font-black uppercase tracking-[.18em] text-muted">Novo material</p><p className="mt-1 text-xs font-black">Story pronto ✓</p></div>
      <div className="float-soft-delayed absolute -right-2 bottom-[16%] hidden rounded-2xl bg-[var(--accent)] p-3 text-black shadow-xl md:block"><p className="text-[9px] font-black uppercase tracking-[.18em]">Resultado</p><p className="mt-1 text-xs font-black">1 ideia → vários formatos</p></div>
    </div>
  );
}
