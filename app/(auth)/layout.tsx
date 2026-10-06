import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-100px)] max-w-6xl place-items-center py-10">
        {children}
      </div>
    </main>
  );
}
