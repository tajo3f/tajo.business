import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, ChevronRight, Clock3, Palette, QrCode, ShieldCheck, Sparkles, Star, Store, Zap } from "lucide-react";
import { InstitutionalHeader } from "@/components/institutional-header";
import { HeroPreview } from "@/components/hero-preview";
import { PointerGlow, SiteEffects } from "@/components/site-effects";
import { Logo } from "@/components/logo";

const modules = [
  [Sparkles,"Material Studio","Crie Story, post e peças comerciais com a identidade da sua marca.","CRIAR"],
  [QrCode,"QR & Links","Transforme WhatsApp, Pix, cardápio, Wi-Fi e URLs em acesso rápido.","CONECTAR"],
  [Star,"Google Review","Facilite a chegada de clientes reais até a área oficial de avaliação.","REPUTAÇÃO"],
  [Palette,"Brand Brain","Cores, estilo e linguagem salvos para manter tudo consistente.","MARCA"],
];
const niches = [
  ["Alimentação","Restaurantes, pizzarias, hamburguerias e cafeterias."],
  ["Beleza","Barbearias, salões, manicures e estética."],
  ["Comércio local","Mercados, hortifrutis, lojas, padarias e conveniências."],
  ["Serviços","Autônomos, oficinas, profissionais e pequenas empresas."],
];
const steps = [
  ["01","Cadastre sua empresa","Informe nicho, WhatsApp, plano e dados principais."],
  ["02","Defina sua identidade","Monte o Brand Brain e deixe a marca consistente."],
  ["03","Escolha um objetivo","Divulgar, gerar QR, conseguir avaliações ou criar material."],
  ["04","Use e evolua","O sistema cresce depois com campanhas, analytics e automações."],
];
const plans = [
  ["Start","19,90","Para colocar sua presença comercial em movimento.",false,["Materiais básicos","QR Codes","Links comerciais","Brand Brain"]],
  ["Pro","39,90","A experiência principal do TAJO ONE.",true,["Tudo do Start","Google Review","Recursos premium","Base para campanhas"]],
  ["Business","79,90","Para operações que querem crescer com equipe.",false,["Tudo do Pro","Mais limites","Base para equipe","Analytics avançado futuro"]],
] as const;

export default function HomePage() {
  return (
    <main data-pointer-glow className="relative overflow-hidden" style={{backgroundImage:"radial-gradient(circle 520px at var(--mx,50%) var(--my,0%), rgba(186,255,41,.055), transparent 70%)"} as CSSProperties}>
      <SiteEffects/><PointerGlow/><InstitutionalHeader/>
      <section className="relative overflow-hidden px-5 pb-24 pt-32 md:pt-40">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-45"/><div className="aurora pointer-events-none absolute inset-0"/>
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-ui bg-surface px-3 py-2 text-[10px] font-black uppercase tracking-[0.17em]" data-reveal><span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]"/>Um novo jeito de cuidar da presença comercial</div>
          <h1 className="reveal mx-auto mt-8 max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.075em] md:text-8xl lg:text-[104px]" data-reveal>Sua empresa pronta<span className="block text-muted">para aparecer e vender.</span></h1>
          <p className="reveal mx-auto mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg" data-reveal>O TAJO ONE reúne identidade, materiais comerciais, QR Codes, links e reputação em uma experiência simples, visual e criada para pequenos negócios.</p>
          <div className="reveal mt-9 flex flex-col justify-center gap-3 sm:flex-row" data-reveal><Link href="/signup" className="shine inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--text)] px-7 text-sm font-black text-[var(--bg)] transition hover:-translate-y-1">Criar minha conta <ArrowRight size={18}/></Link><a href="#recursos" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-ui bg-surface px-7 text-sm font-black transition hover:-translate-y-1">Conhecer o sistema <ChevronRight size={18}/></a></div>
          <HeroPreview/>
        </div>
      </section>

      <section className="border-y border-ui bg-[var(--text)] py-4 text-[var(--bg)]"><div className="overflow-hidden"><div className="marquee-track gap-10 pr-10 text-xs font-black uppercase tracking-[0.18em] opacity-70">{[...Array(2)].flatMap(()=>["MATERIAIS","QR CODES","WHATSAPP","GOOGLE REVIEW","BRAND BRAIN","PEQUENOS NEGÓCIOS","PRESENÇA DIGITAL","CONVERSÃO"]).map((item,i)=><span key={`${item}-${i}`} className="flex items-center gap-10">{item}<span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"/></span>)}</div></div></section>

      <section id="recursos" className="px-5 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="reveal max-w-3xl" data-reveal><p className="text-xs font-black uppercase tracking-[.18em] text-muted">O sistema</p><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.065em] md:text-7xl">Menos ferramentas.<span className="block text-muted">Mais direção comercial.</span></h2></div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{modules.map(([Icon,title,text,tag],index)=>{const C=Icon as typeof Sparkles;return <article key={String(title)} className="reveal premium-ring group min-h-[330px] rounded-[30px] bg-surface p-6 transition duration-500 hover:-translate-y-2" data-reveal><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft"><C size={21}/></span><span className="text-[9px] font-black tracking-[.18em] text-muted">{String(tag)}</span></div><div className="mt-28"><p className="text-[11px] font-black text-muted">0{index+1}</p><h3 className="mt-2 text-2xl font-black tracking-[-.045em]">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></div></article>})}</div></div></section>

      <section className="px-5 pb-24 md:pb-32"><div className="reveal mx-auto grid max-w-7xl overflow-hidden rounded-[38px] bg-[var(--text)] text-[var(--bg)] lg:grid-cols-2" data-reveal><div className="noise relative p-7 md:p-12"><p className="text-xs font-black uppercase tracking-[.18em] opacity-45">Diferencial</p><h2 className="mt-5 max-w-xl text-4xl font-black leading-[.95] tracking-[-.06em] md:text-6xl">Você escolhe o objetivo.<span className="block opacity-50">O sistema escolhe o caminho.</span></h2><p className="mt-6 max-w-lg text-sm leading-7 opacity-60 md:text-base">Em vez de abrir uma tela cheia de ferramentas, o TAJO ONE começa perguntando o que sua empresa precisa fazer hoje.</p></div><div className="grid gap-3 bg-white/[0.035] p-5 md:p-8">{[["Quero divulgar uma promoção",Sparkles],["Quero levar clientes ao WhatsApp",Zap],["Quero mais avaliações",Star],["Quero organizar minha identidade",Palette]].map(([text,Icon])=>{const C=Icon as typeof Sparkles;return <div key={String(text)} className="flex items-center justify-between rounded-[22px] border border-white/9 bg-white/[0.035] p-5"><div className="flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/8"><C size={18}/></span><span className="text-sm font-black">{String(text)}</span></div><ArrowRight size={17} className="opacity-35"/></div>})}</div></div></section>

      <section id="como-funciona" className="px-5 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.18em] text-muted">Como funciona</p><h2 className="mt-4 text-4xl font-black tracking-[-.06em] md:text-7xl">Comece simples.<span className="block text-muted">Evolua sem reconstruir tudo.</span></h2></div><div className="inline-flex items-center gap-2 text-xs font-black text-muted"><ShieldCheck size={17}/>Supabase + Vercel + arquitetura multiempresa</div></div><div className="mt-12 border-t border-ui">{steps.map(([number,title,text])=><div key={number} className="reveal grid gap-4 border-b border-ui py-7 md:grid-cols-[100px_1fr_1fr] md:items-center" data-reveal><span className="text-xs font-black text-muted">{number}</span><h3 className="text-xl font-black tracking-[-.035em]">{title}</h3><p className="text-sm leading-6 text-muted">{text}</p></div>)}</div></div></section>

      <section id="nichos" className="px-5 pb-24 md:pb-32"><div className="mx-auto max-w-7xl"><div className="reveal rounded-[38px] border border-ui bg-surface p-6 md:p-10" data-reveal><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-black"><Store size={21}/></div><h2 className="mt-7 text-4xl font-black tracking-[-.06em] md:text-6xl">Feito para o negócio local.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted">Os mesmos motores do sistema, com caminhos e materiais adaptados para diferentes tipos de operação.</p></div><div className="grid gap-3 md:grid-cols-2">{niches.map(([title,text],i)=><div key={title} className="rounded-[24px] bg-soft p-5"><div className="flex items-start justify-between"><span className="text-[10px] font-black text-muted">0{i+1}</span><ArrowRight size={16} className="text-muted"/></div><h3 className="mt-12 text-xl font-black tracking-[-.04em]">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}</div></div></div></div></section>

      <section id="planos" className="px-5 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="reveal text-center" data-reveal><p className="text-xs font-black uppercase tracking-[.18em] text-muted">Planos iniciais</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-.06em] md:text-7xl">Comece no tamanho certo.</h2></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{plans.map(([name,price,description,featured,features])=><article key={name} className={`reveal rounded-[32px] p-6 md:p-8 ${featured?"bg-[var(--text)] text-[var(--bg)]":"premium-ring bg-surface"}`} data-reveal><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] opacity-55">{name}</p><p className="mt-4 text-4xl font-black tracking-[-.06em]">R$ {price}<span className="text-sm font-normal opacity-50"> / mês</span></p></div>{featured?<span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[10px] font-black text-black">PRINCIPAL</span>:null}</div><p className="mt-5 min-h-12 text-sm leading-6 opacity-60">{description}</p><div className="my-7 h-px bg-current opacity-10"/><div className="grid gap-3">{features.map(feature=><div key={feature} className="flex items-center gap-3 text-sm"><Check size={16}/>{feature}</div>)}</div><Link href="/signup" className={`mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-2xl text-sm font-black ${featured?"bg-[var(--accent)] text-black":"bg-[var(--text)] text-[var(--bg)]"}`}>Começar com {name}</Link></article>)}</div></div></section>

      <section className="px-5 pb-12 pt-16"><div className="reveal mx-auto max-w-7xl overflow-hidden rounded-[42px] bg-[var(--accent)] p-7 text-black md:p-12" data-reveal><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em]"><Clock3 size={16}/>Seu próximo passo</div><h2 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-8xl">Uma empresa mais organizada começa com um clique.</h2></div><Link href="/signup" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-black px-7 text-sm font-black text-white">Criar minha conta <ArrowRight size={18}/></Link></div></div></section>

      <footer className="mx-auto max-w-7xl px-5 py-12"><div className="flex flex-col gap-7 border-t border-ui pt-8 md:flex-row md:items-center md:justify-between"><Logo/><div className="flex flex-wrap gap-5 text-xs font-bold text-muted"><a href="#recursos">Recursos</a><a href="#nichos">Nichos</a><a href="#planos">Planos</a><Link href="/login">Entrar</Link></div><p className="text-xs text-muted">TAJO Digital • TAJO ONE</p></div></footer>
    </main>
  );
}
