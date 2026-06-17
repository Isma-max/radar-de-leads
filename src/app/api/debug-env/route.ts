import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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

  let dbResult = {};
  try {
    const db = getSupabaseAdmin();
    
    // Ejecutar la consulta con ordenamiento igual que /api/news
    const query = db.from("news").select("*")
      .order("score", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(5);

    const { data, error } = await query;
    dbResult = {
      success: !error,
      count: data ? data.length : 0,
      error: error ? error.message : null,
      firstTitle: data && data[0] ? data[0].title : null,
    };
  } catch (e: any) {
    dbResult = {
      success: false,
      error: e.message || "Catch error",
    };
  }

  return NextResponse.json({
    url,
    anon: mask(anon),
    service: mask(service),
    gemini: mask(gemini, 8),
    dbResult,
  });
}
