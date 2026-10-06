"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [["Recursos","#recursos"],["Como funciona","#como-funciona"],["Nichos","#nichos"],["Planos","#planos"]];

export function InstitutionalHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-[22px] px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label,href]) => <a key={href} href={href} className="text-xs font-bold text-muted transition hover:text-[var(--text)]">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden rounded-xl px-4 py-2.5 text-xs font-bold sm:block">Entrar</Link>
          <Link href="/signup" className="shine rounded-xl bg-[var(--text)] px-4 py-2.5 text-xs font-black text-[var(--bg)]">Começar</Link>
          <button onClick={() => setOpen(v=>!v)} className="grid h-10 w-10 place-items-center rounded-xl border border-ui bg-surface lg:hidden" aria-label="Abrir menu">{open?<X size={18}/>:<Menu size={18}/>}</button>
        </div>
      </div>
      {open ? <div className="glass mx-auto mt-2 max-w-7xl rounded-[22px] p-3 lg:hidden">{links.map(([label,href]) => <a key={href} href={href} onClick={()=>setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-soft">{label}</a>)}</div> : null}
    </header>
  );
}
