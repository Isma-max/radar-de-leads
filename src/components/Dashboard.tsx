"use client";

import { useCallback, useEffect, useState } from "react";
import type { NewsItem, NewsStatus } from "@/lib/types";
import { NEWS_STATUSES, STATUS_LABELS } from "@/lib/types";
import { StatusBadge, ScoreBadge } from "./badges";
import { NewsDetailModal } from "./NewsDetailModal";

export default function Dashboard({ projectId }: { projectId?: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // filtros
  const [statusFilter, setStatusFilter] = useState<NewsStatus | "">("");
  const [q, setQ] = useState("");
  const [order, setOrder] = useState<"score" | "recent">("score");

  // modal
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [busy, setBusy] = useState<"lead" | "script" | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!projectId) return; // Esperar a que el ID del proyecto esté definido
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("projectId", projectId);
      if (statusFilter) params.set("status", statusFilter);
      if (q) params.set("q", q);
      params.set("order", order);
      const res = await fetch(`/api/news?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar noticias");
      setNews(data.news);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [projectId, statusFilter, q, order]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function runImport() {
    if (!projectId) return;
    setImporting(true);
    setError(null);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al importar");
      flash(`Importación lista: ${data.totalInserted} noticias nuevas.`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al importar");
    } finally {
      setImporting(false);
    }
  }

  async function updateStatus(item: NewsItem, status: NewsStatus) {
    try {
      const res = await fetch(`/api/news/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      replaceItem(data.news);
    } catch (e) {
      flash(e instanceof Error ? e.message : "Error al actualizar");
    }
  }

  function replaceItem(updated: NewsItem) {
    setNews((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setSelected((cur) => (cur && cur.id === updated.id ? updated : cur));
  }

  async function generate(kind: "lead" | "script", item: NewsItem) {
    setBusy(kind);
    try {
      const res = await fetch(`/api/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al generar");
      replaceItem(data.news);
    } catch (e) {
      flash(e instanceof Error ? e.message : "Error al generar");
    } finally {
      setBusy(null);
    }
  }

  function copyLink(url: string, id: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <div className="space-y-6">
      {/* Barra de acciones */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink-100 pb-5">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-wemul-navy">
            Noticias detectadas
          </h1>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink-400 mt-1">
            {news.length} resultado{news.length === 1 ? "" : "s"}
          </p>
        </div>
        <button
          onClick={runImport}
          disabled={importing}
          className="rounded-full bg-wemul-coral px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-wemul-coral transition-all hover:bg-coral-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-97 disabled:opacity-50 disabled:transform-none"
        >
          {importing ? "Importando…" : "↻ Importar desde RSS"}
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar en títulos…"
          className="w-64 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-medium text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
        />
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as NewsStatus | "")}
            className="rounded-full border border-ink-200 bg-white pl-4 pr-8 py-2 text-xs font-bold text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="">Todos los estados</option>
            {NEWS_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-ink-400">
            ▼
          </span>
        </div>
        <div className="relative">
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "score" | "recent")}
            className="rounded-full border border-ink-200 bg-white pl-4 pr-8 py-2 text-xs font-bold text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="score">Ordenar por score</option>
            <option value="recent">Ordenar por fecha</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-ink-400">
            ▼
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-wemul-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 shadow-wemul-sm">
          {error}
        </div>
      )}

      {/* Tabla / Card */}
      <div className="overflow-hidden rounded-card border border-ink-100 bg-white shadow-wemul-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-25 text-[10px] font-extrabold uppercase tracking-widest text-ink-500">
              <tr>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Fuente</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400 font-medium">
                    Cargando…
                  </td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400 font-medium">
                    No hay noticias en este contexto. Pulsa “Importar desde RSS” para empezar.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-ink-25/40">
                    <td className="px-4 py-3 text-center">
                      <ScoreBadge score={item.score} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(item)}
                        className="text-left font-bold text-wemul-navy hover:text-wemul-blue hover:underline transition-colors leading-snug max-w-lg"
                      >
                        {item.title}
                      </button>
                      {item.signals.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {item.signals.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="rounded bg-ink-50 border border-ink-100 px-1.5 py-0.5 text-[9px] font-bold text-ink-600 uppercase tracking-wide"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-600">
                      {item.source_name}
                    </td>
                    <td className="px-4 py-3 text-ink-500">
                      {item.category ? (
                        <span className="inline-block rounded-md bg-ink-50 px-2 py-0.5 text-[10px] font-semibold border border-ink-100">
                          {item.category}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-ink-400 font-medium">
                      {item.published_at ? formatDate(item.published_at) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelected(item)}
                          className="rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-bold text-wemul-navy hover:bg-ink-50 active:scale-95 transition-all shadow-wemul-sm"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => copyLink(item.url, item.id)}
                          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-wemul-blue hover:bg-blue-100 active:scale-95 transition-all"
                        >
                          {copiedId === item.id ? "¡Copiado!" : "Copiar Link"}
                        </button>
                        {item.status !== "seleccionada" && (
                          <button
                            onClick={() => updateStatus(item, "seleccionada")}
                            className="rounded-full border border-coral-200 bg-coral-50 px-3 py-1 text-[11px] font-bold text-wemul-coral hover:bg-coral-100 active:scale-95 transition-all"
                          >
                            Seleccionar
                          </button>
                        )}
                        {item.status !== "descartada" && (
                          <button
                            onClick={() => updateStatus(item, "descartada")}
                            className="rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-bold text-ink-500 hover:bg-ink-50 active:scale-95 transition-all"
                          >
                            Descartar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <NewsDetailModal
          news={selected}
          busy={busy}
          onClose={() => setSelected(null)}
          onGenerateLead={() => generate("lead", selected)}
          onGenerateScript={() => generate("script", selected)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-navy-700 bg-wemul-navy px-5 py-3 text-xs font-bold text-white shadow-wemul-lg animate-fade-in-up">
          <span className="text-wemul-coral">●</span>
          {toast}
        </div>
      )}
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
