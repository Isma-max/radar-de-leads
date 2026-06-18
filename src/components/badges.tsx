import { NewsStatus, STATUS_LABELS } from "@/lib/types";

const STATUS_STYLES: Record<NewsStatus, string> = {
  nueva: "bg-blue-50 text-blue-600 border border-blue-100",
  seleccionada: "bg-coral-50 text-coral-600 border border-coral-100",
  descartada: "bg-ink-50 text-ink-500 border border-ink-100",
  guion_generado: "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

export function StatusBadge({ status }: { status: NewsStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  let style = "bg-ink-100 text-ink-600 font-bold";
  if (score >= 70) style = "bg-wemul-coral text-white font-black shadow-wemul-coral";
  else if (score >= 45) style = "bg-wemul-blue text-white font-black shadow-wemul-blue";

  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-display text-sm tracking-tight transition-transform duration-140 hover:scale-105 ${style}`}
      title={`Score editorial: ${score}/100`}
    >
      {score}
    </span>
  );
}
