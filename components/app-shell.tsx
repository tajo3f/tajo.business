"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Building2,
  Grid2X2,
  LogOut,
  Menu,
  Palette,
  Plus,
  QrCode,
  Settings,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app", label: "Início", icon: Grid2X2 },
  { href: "/app/create", label: "Criar", icon: Plus },
  { href: "/app/materials", label: "Materiais", icon: Sparkles },
  { href: "/app/qr", label: "QR & Links", icon: QrCode },
  { href: "/app/reviews", label: "Avaliações", icon: Star },
  { href: "/app/brand", label: "Minha marca", icon: Palette },
  { href: "/app/results", label: "Resultados", icon: BarChart3 },
  { href: "/app/settings", label: "Empresa", icon: Settings },
];

export function AppShell({
  organization,
  role,
  plan,
  children,
}: {
  organization: string;
  role: string;
  plan: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const menu = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Logo href="/app" />
        <button
          className="grid h-10 w-10 place-items-center rounded-xl lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-ui bg-soft p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--foreground)] text-[var(--background)]">
            <Building2 size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{organization}</p>
            <p className="text-xs text-muted">
              {plan} • {role}
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-6 grid gap-1">
        {nav.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active ? "bg-[var(--foreground)] text-[var(--background)]" : "hover:bg-soft"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={signOut}
        className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted hover:bg-soft"
      >
        <LogOut size={18} />
        Sair
      </button>
    </div>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="hidden border-r border-ui bg-[var(--surface)] p-5 backdrop-blur-xl lg:block">
        {menu}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/40 p-3 lg:hidden">
          <aside className="h-full max-w-[300px] rounded-[28px] bg-[var(--surface-solid)] p-5 shadow-2xl">
            {menu}
          </aside>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ui bg-[color:var(--background)]/85 px-4 backdrop-blur-xl md:px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-ui bg-surface lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={19} />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              TAJO ONE
            </p>
          </div>

          <ThemeToggle />
        </header>

        <main className="mx-auto max-w-[1500px] p-4 pb-24 md:p-7">
          {children}
        </main>

        <nav className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-around rounded-[22px] border border-ui bg-[var(--surface)] p-2 shadow-2xl backdrop-blur-xl lg:hidden">
          {nav.slice(0, 5).map((item) => {
            const active =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "grid min-w-14 place-items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold",
                  active ? "bg-[var(--foreground)] text-[var(--background)]" : "text-muted"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
