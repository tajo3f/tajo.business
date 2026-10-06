import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-5">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between"><Logo/><ThemeToggle/></div>
      <div className="relative mx-auto grid min-h-[calc(100vh-90px)] max-w-6xl place-items-center py-10">{children}</div>
    </main>
  );
}
