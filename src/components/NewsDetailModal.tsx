"use client";

import { useState } from "react";
import type { NewsItem } from "@/lib/types";
import { StatusBadge, ScoreBadge } from "./badges";

interface Props {
  news: NewsItem;
  busy: "lead" | "script" | null;
  onClose: () => void;
  onGenerateLead: () => void;
  onGenerateScript: () => void;
}

export function NewsDetailModal({
  news,
  busy,
  onClose,
  onGenerateLead,
  onGenerateScript,
}: Props) {
  const [copied, setCopied] = useState<"lead" | "script" | "link" | null>(null);

  function copy(text: string, which: "lead" | "script" | "link") {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const leadText = news.lead
    ? [
        `GANCHO: ${news.lead.gancho}`,
        `ÁNGULO: ${news.lead.angulo}`,
        `POR QUÉ FUNCIONA: ${news.lead.porQueFunciona}`,
        `FORMATO: ${news.lead.formato}`,
        `ADVERTENCIAS: ${news.lead.advertencias}`,
      ].join("\n\n")
    : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-wemul-navy/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-2xl rounded-card bg-white shadow-wemul-lg border border-ink-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-100 p-6">
          <div className="flex items-start gap-4">
            <ScoreBadge score={news.score} />
            <div>
              <h2 className="font-display text-lg font-black tracking-tight text-wemul-navy leading-snug">
                {news.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-bold text-ink-400 uppercase tracking-widest">
                <span>{news.source_name}</span>
                {news.category && <span>· {news.category}</span>}
                {news.published_at && (
                  <span>· {formatDate(news.published_at)}</span>
                )}
                <StatusBadge status={news.status} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-400 hover:bg-ink-100 hover:text-wemul-navy transition-all active:scale-95"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Resumen + señales */}
          <section className="space-y-3">
            {news.summary && (
              <p className="text-xs leading-relaxed text-ink-700">{news.summary}</p>
            )}
            <div className="flex flex-wrap gap-1">
              {news.signals.map((s) => (
                <span
                  key={s}
                  className="rounded bg-ink-50 border border-ink-100 px-2 py-0.5 text-[9px] font-bold text-ink-600 uppercase tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-wemul-blue hover:underline"
              >
                Abrir noticia original ↗
              </a>
              <span className="text-ink-200">·</span>
              <button
                onClick={() => copy(news.url, "link")}
                className="text-xs font-bold text-wemul-coral hover:underline"
              >
                {copied === "link" ? "¡Enlace copiado!" : "Copiar enlace"}
              </button>
            </div>
          </section>

          {/* Acciones */}
          <section className="flex flex-wrap gap-3 border-t border-ink-50 pt-4">
            <button
              onClick={onGenerateLead}
              disabled={busy !== null}
              className="rounded-full bg-wemul-coral px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-wemul-coral transition-all hover:bg-coral-600 active:scale-97 disabled:opacity-50 disabled:transform-none"
            >
              {busy === "lead"
                ? "Generando lead…"
                : news.lead
                ? "Regenerar lead"
                : "Generar lead"}
            </button>
            <button
              onClick={onGenerateScript}
              disabled={busy !== null}
              className="rounded-full bg-wemul-blue px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-wemul-blue transition-all hover:bg-blue-600 active:scale-97 disabled:opacity-50 disabled:transform-none"
            >
              {busy === "script"
                ? "Generando guion…"
                : news.script
                ? "Regenerar guion"
                : "Generar guion"}
            </button>
          </section>

          {/* Lead */}
          {news.lead && (
            <section className="rounded-wemul-lg border border-ink-100 bg-ink-25 p-5 shadow-wemul-sm space-y-4">
              <div className="flex items-center justify-between border-b border-ink-100 pb-2">
                <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-wemul-navy">
                  Lead Propuesto
                </h3>
                <button
                  onClick={() => copy(leadText, "lead")}
                  className="text-[10px] font-bold uppercase tracking-wider text-ink-400 hover:text-wemul-navy transition-colors"
                >
                  {copied === "lead" ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Gancho" value={news.lead.gancho} />
                <Field label="Ángulo" value={news.lead.angulo} />
                <Field label="Por qué funciona" value={news.lead.porQueFunciona} />
                <Field label="Formato" value={news.lead.formato} />
                <div className="sm:col-span-2">
                  <Field label="Advertencias" value={news.lead.advertencias} warn />
                </div>
              </dl>
            </section>
          )}

          {/* Guion */}
          {news.script && (
            <section className="rounded-wemul-lg border border-ink-100 bg-ink-25 p-5 shadow-wemul-sm space-y-3">
              <div className="flex items-center justify-between border-b border-ink-100 pb-2">
                <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-wemul-navy">
                  Guion (locución)
                </h3>
                <button
                  onClick={() => copy(news.script!, "script")}
                  className="text-[10px] font-bold uppercase tracking-wider text-ink-400 hover:text-wemul-navy transition-colors"
                >
                  {copied === "script" ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
              <p className="whitespace-pre-wrap text-xs leading-relaxed text-ink-800 font-medium">
                {news.script}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Subcomponente Field personalizado
function Field({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div>
      <dt className="text-[9px] font-extrabold uppercase tracking-widest text-ink-400">
        {label}
      </dt>
      <dd className={`text-xs mt-1 ${warn ? "text-coral-600 font-bold" : "text-ink-700 font-medium"}`}>
        {value}
      </dd>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
