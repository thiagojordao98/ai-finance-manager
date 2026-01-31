import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NeonAuthProvider } from "@/components/neon-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Financeiro - Controle pelo WhatsApp",
  description:
    "Controle suas finanças de forma simples pelo WhatsApp. Registre transações em segundos e acompanhe tudo em um dashboard profissional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <NeonAuthProvider>{children}</NeonAuthProvider>
      </body>
    </html>
  );
}
