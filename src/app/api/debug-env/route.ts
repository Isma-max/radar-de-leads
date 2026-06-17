import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "undefined";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "undefined";
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || "undefined";
  const gemini = process.env.GEMINI_API_KEY || "undefined";

  const mask = (val: string, showLen: number = 10) => {
    if (val === "undefined") return "undefined";
    if (val.length <= showLen * 2) return "***hidden***";
    return `${val.slice(0, showLen)}...${val.slice(-5)}`;
  };

  return NextResponse.json({
    url,
    anon: mask(anon),
    service: mask(service),
    gemini: mask(gemini, 8),
  });
}
