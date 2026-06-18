"use client";

import { useEffect, useState } from "react";
import type { Source } from "@/lib/types";

export default function SourcesManager({ projectId }: { projectId?: string }) {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // formulario nueva fuente
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState(50);
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sources?projectId=${projectId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar fuentes");
      setSources(data.sources);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [projectId]);

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    if (!projectId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, name, url, category, weight }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear fuente");
      setName("");
      setUrl("");
      setCategory("");
      setWeight(50);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(s: Source) {
    await patch(s.id, { active: !s.active });
  }

  async function changeWeight(s: Source, value: number) {
    await patch(s.id, { weight: value });
  }

  async function patch(id: string, body: Record<string, unknown>) {
    try {
      const res = await fetch(`/api/sources/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setSources((prev) => prev.map((s) => (s.id === id ? data.source : s)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al actualizar");
    }
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta fuente?")) return;
    try {
      const res = await fetch(`/api/sources/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }
      setSources((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase tracking-tight text-wemul-navy">
          Fuentes RSS
        </h1>
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink-400 mt-1">
          Administra los feeds desde donde se importan las noticias.
        </p>
      </div>

      {error && (
        <div className="rounded-wemul-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 shadow-wemul-sm">
          {error}
        </div>
      )}

      {/* Form nueva fuente */}
      <form
        onSubmit={addSource}
        className="grid grid-cols-1 gap-3 rounded-card border border-ink-100 bg-white p-5 shadow-wemul-md sm:grid-cols-12 items-center"
      >
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre (ej: BioBioChile)"
          className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-medium text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all sm:col-span-3"
        />
        <input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL del feed RSS/Atom"
          className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-medium text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all sm:col-span-5"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría"
          className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-medium text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all sm:col-span-2"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value || "0", 10))}
          title="Peso editorial (0-100)"
          className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-bold text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all sm:col-span-1 text-center"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-wemul-coral px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-wemul-coral transition-all hover:bg-coral-600 active:scale-97 disabled:opacity-50 sm:col-span-1"
        >
          {saving ? "…" : "Añadir"}
        </button>
      </form>

      {/* Tabla de fuentes */}
      <div className="overflow-hidden rounded-card border border-ink-100 bg-white shadow-wemul-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-25 text-[10px] font-extrabold uppercase tracking-widest text-ink-500">
              <tr>
                <th className="px-4 py-3">Fuente</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-center">Peso</th>
                <th className="px-4 py-3 text-center">Activa</th>
                <th className="px-4 py-3">Última lectura</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400 font-medium">
                    Cargando…
                  </td>
                </tr>
              ) : sources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400 font-medium">
                    No hay fuentes. Añade una arriba.
                  </td>
                </tr>
              ) : (
                sources.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-ink-25/40">
                    <td className="px-4 py-3 font-bold text-wemul-navy">
                      {s.name}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-ink-500 font-semibold">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-wemul-blue hover:underline"
                      >
                        {s.url}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {s.category ? (
                        <span className="inline-block rounded-md bg-ink-50 border border-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-600">
                          {s.category}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        defaultValue={s.weight}
                        onBlur={(e) =>
                          changeWeight(s, parseInt(e.target.value || "0", 10))
                        }
                        className="w-16 rounded-full border border-ink-200 bg-white px-3 py-1 text-center text-xs font-bold text-wemul-navy shadow-wemul-sm focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(s)}
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-105 ${
                          s.active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-ink-50 text-ink-500 border border-ink-100"
                        }`}
                      >
                        {s.active ? "Activa" : "Inactiva"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-ink-400 font-medium">
                      {s.last_fetched_at
                        ? new Date(s.last_fetched_at).toLocaleString("es-CL", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(s.id)}
                        className="text-xs font-bold text-wemul-coral hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
