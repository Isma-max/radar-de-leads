"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ProjectSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentProjectId = searchParams.get("projectId");

  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (res.ok && data.projects) {
          setProjects(data.projects);
          
          // Si no hay un projectId en la URL, intentamos tomarlo del localStorage
          // o del primer proyecto de la lista por defecto.
          if (!currentProjectId) {
            const stored = localStorage.getItem("currentProjectId");
            const defaultId = stored || data.projects[0]?.id;
            if (defaultId) {
              localStorage.setItem("currentProjectId", defaultId);
              const params = new URLSearchParams(searchParams.toString());
              params.set("projectId", defaultId);
              router.replace(`${pathname}?${params.toString()}`);
            }
          }
        }
      } catch (e) {
        console.error("Error al cargar proyectos:", e);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentProjectId, pathname, router, searchParams]);

  function handleProjectChange(id: string) {
    localStorage.setItem("currentProjectId", id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("projectId", id);
    router.push(`${pathname}?${params.toString()}`);
  }

  if (loading) {
    return <div className="text-[11px] font-medium text-ink-400 animate-pulse">Cargando proyectos...</div>;
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-400">Contexto:</span>
      <div className="relative">
        <select
          value={currentProjectId || ""}
          onChange={(e) => handleProjectChange(e.target.value)}
          className="rounded-full border border-ink-200 bg-white pl-4 pr-8 py-1.5 text-xs font-bold text-wemul-navy shadow-wemul-sm hover:border-ink-300 focus:border-wemul-blue focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all cursor-pointer appearance-none"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-400">
          ▼
        </span>
      </div>
    </div>
  );
}
