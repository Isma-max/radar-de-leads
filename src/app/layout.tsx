import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProjectSelector from "@/components/ProjectSelector";
import NavLinks from "@/components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radar de Leads",
  description:
    "Detecta noticias chilenas con potencial para videos cortos (Facebook, Shorts, TikTok, Reels).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl">📡</span>
                  <span className="text-lg font-semibold text-slate-800">Radar de Leads</span>
                </Link>
                <Suspense fallback={<div className="text-xs text-slate-400">Cargando...</div>}>
                  <ProjectSelector />
                </Suspense>
              </div>
              <Suspense fallback={<div className="text-xs text-slate-400">...</div>}>
                <NavLinks />
              </Suspense>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
