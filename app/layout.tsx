import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";

export const metadata: Metadata = {
  title: {
    default: "TAJO ONE — Sua central comercial",
    template: "%s • TAJO ONE",
  },
  description:
    "Central comercial para pequenos negócios criarem materiais, QR Codes, links, reputação e identidade em um só lugar.",
  applicationName: "TAJO ONE",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
