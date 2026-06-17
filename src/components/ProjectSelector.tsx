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
    return <div className="text-xs text-slate-400">Cargando proyectos...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contexto:</span>
      <select
        value={currentProjectId || ""}
        onChange={(e) => handleProjectChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-sm font-semibold text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
