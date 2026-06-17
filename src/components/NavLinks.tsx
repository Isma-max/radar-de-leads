"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavLinks() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const suffix = projectId ? `?projectId=${projectId}` : "";

  return (
    <nav className="flex items-center gap-5 text-sm font-medium">
      <Link href={`/${suffix}`} className="text-slate-500 hover:text-slate-950 transition-colors">
        Dashboard
      </Link>
      <Link href={`/sources${suffix}`} className="text-slate-500 hover:text-slate-950 transition-colors">
        Fuentes RSS
      </Link>
    </nav>
  );
}
