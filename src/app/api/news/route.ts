import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { NEWS_STATUSES, NewsStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const q = searchParams.get("q");
    const order = searchParams.get("order") ?? "score";

    const db = getSupabaseAdmin();
    
    // Diagnóstico: contar noticias de este proyecto
    let countQuery = db.from("news").select("*", { count: "exact", head: true });
    if (projectId) {
      countQuery = countQuery.eq("project_id", projectId);
    }
    const { count: totalNewsCount, error: countErr } = await countQuery;

    let query = db.from("news").select("*");

    if (projectId) {
      query = query.eq("project_id", projectId);
    }
    if (status && NEWS_STATUSES.includes(status as NewsStatus)) {
      query = query.eq("status", status);
    }
    if (category) {
      query = query.eq("category", category);
    }
    if (q) {
      query = query.ilike("title", `%${q}%`);
    }

    if (order === "recent") {
      query = query.order("published_at", { ascending: false, nullsFirst: false });
    } else {
      query = query
        .order("score", { ascending: false })
        .order("published_at", { ascending: false, nullsFirst: false });
    }

    query = query.limit(300);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ 
      news: data ?? [],
      debug: {
        totalNewsCount,
        countErr: countErr ? countErr.message : null,
        params: { status, category, q, order }
      }
    });
  } catch (err) {
    return NextResponse.json({ error: message(err) }, { status: 500 });
  }
}

function message(err: unknown): string {
  return err instanceof Error ? err.message : "Error desconocido";
}
