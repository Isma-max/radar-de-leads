"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export default function NavLinks() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const projectId = searchParams.get("projectId");
  const suffix = projectId ? `?projectId=${projectId}` : "";

  const isDashboard = pathname === "/";
  const isSources = pathname.startsWith("/sources");

  return (
    <nav className="flex items-center gap-6 text-sm font-bold tracking-wide">
      <Link
        href={`/${suffix}`}
        className={`transition-all duration-140 border-b-2 pb-1 ${
          isDashboard
            ? "border-wemul-coral text-wemul-navy font-bold"
            : "border-transparent text-ink-500 hover:text-wemul-navy"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href={`/sources${suffix}`}
        className={`transition-all duration-140 border-b-2 pb-1 ${
          isSources
            ? "border-wemul-coral text-wemul-navy font-bold"
            : "border-transparent text-ink-500 hover:text-wemul-navy"
        }`}
      >
        Fuentes RSS
      </Link>
    </nav>
  );
}
