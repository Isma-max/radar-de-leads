import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProjectSelector from "@/components/ProjectSelector";
import NavLinks from "@/components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radar de Leads — Wemul",
  description:
    "Detecta noticias chilenas con potencial para videos cortos. Potenciado por Wemul.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <div className="flex min-h-screen flex-col bg-ink-25">
          <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-md shadow-wemul-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-3 group">
                  <img
                    src="/wemul-icon.png"
                    alt="Wemul Logo"
                    className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-black uppercase tracking-tight text-wemul-navy leading-none">
                      Radar de Leads
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-wemul-coral uppercase leading-none mt-0.5">
                      by Wemul
                    </span>
                  </div>
                </Link>
                <Suspense fallback={<div className="text-xs text-ink-400">Cargando...</div>}>
                  <ProjectSelector />
                </Suspense>
              </div>
              <Suspense fallback={<div className="text-xs text-ink-400">...</div>}>
                <NavLinks />
              </Suspense>
            </div>
          </header>
          
          <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6">
            {children}
          </main>

          <footer className="border-t border-navy-700 bg-wemul-navy py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                  <img
                    src="/wemul-icon.png"
                    alt="Wemul Logo"
                    className="h-8 w-auto brightness-0 invert object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-base font-black uppercase tracking-tight text-white leading-none">
                      Radar de Leads
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-wemul-sky uppercase leading-none mt-0.5">
                      Content Lab & Creativity
                    </span>
                  </div>
                </div>
                <p className="max-w-md text-center text-xs leading-relaxed text-navy-200 md:text-right">
                  Combinamos innovación, estrategia y experiencia digital para transformar ideas en resultados. Creamos, amplificamos y administramos contenidos para redes sociales.
                </p>
              </div>
              <div className="mt-8 border-t border-navy-800 pt-6 text-center text-[11px] text-navy-300">
                &copy; {new Date().getFullYear()} Wemul. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
