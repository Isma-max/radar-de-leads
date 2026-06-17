import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { fetchFeed } from "@/lib/rss";
import { scoreNews } from "@/lib/scoring";
import type { Source } from "@/lib/types";

export const dynamic = "force-dynamic";
// La importación puede tardar; damos margen en Vercel.
export const maxDuration = 60;

// POST /api/import — importa noticias desde las fuentes RSS activas.
// Calcula score + señales y hace upsert (evita duplicados por url).
//
// Seguridad opcional: si CRON_SECRET está definido, exige el header
// x-cron-secret con ese valor (útil para Vercel Cron).
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.CRON_SECRET;
    if (secret && req.method === "GET") {
      // Acepta header propio o el bearer que envía Vercel Cron automáticamente.
      const ok =
        req.headers.get("x-cron-secret") === secret ||
        req.headers.get("authorization") === `Bearer ${secret}`;
      if (!ok) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
    }

    let projectId: string | null = null;
    try {
      const body = await req.json();
      projectId = body?.projectId || null;
    } catch (e) {
      // Ignorar si no hay body o no es JSON
    }

    if (!projectId) {
      const { searchParams } = new URL(req.url);
      projectId = searchParams.get("projectId");
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId es obligatorio" },
        { status: 400 }
      );
    }

    const db = getSupabaseAdmin();

    const { data: sources, error: srcErr } = await db
      .from("sources")
      .select("*")
      .eq("project_id", projectId)
      .eq("active", true);
    if (srcErr) throw srcErr;

    const results: {
      source: string;
      fetched: number;
      inserted: number;
      error?: string;
    }[] = [];

    // 1. Fetch all feeds in parallel
    const fetchPromises = (sources ?? []).map(async (source) => {
      try {
        const entries = await fetchFeed(source.url);
        return { source, entries, error: null };
      } catch (e) {
        return {
          source,
          entries: [],
          error: e instanceof Error ? e.message : "Error al leer el feed",
        };
      }
    });

    const fetchResults = await Promise.all(fetchPromises);

    // 2. Gather all news entries and compile database records
    const newsToUpsert: any[] = [];
    const successfulSourceIds: string[] = [];

    for (const res of fetchResults) {
      const { source, entries, error } = res;
      if (error) {
        results.push({
          source: source.name,
          fetched: 0,
          inserted: 0,
          error,
        });
        continue;
      }

      successfulSourceIds.push(source.id);

      for (const entry of entries) {
        const { score, signals } = scoreNews({
          title: entry.title,
          summary: entry.summary,
          publishedAt: entry.publishedAt,
          sourceWeight: source.weight,
          category: source.category,
        });

        newsToUpsert.push({
          project_id: projectId,
          source_id: source.id,
          source_name: source.name,
          title: entry.title,
          url: entry.url,
          published_at: entry.publishedAt,
          category: source.category,
          summary: entry.summary,
          signals,
          score,
          status: "nueva",
        });
      }
    }

    // 3. Perform a single bulk upsert in Supabase
    let totalInserted = 0;
    const insertedCountBySource: Record<string, number> = {};

    if (newsToUpsert.length > 0) {
      const { data: insertedRows, error: insErr } = await db
        .from("news")
        .upsert(
          newsToUpsert,
          { onConflict: "url", ignoreDuplicates: true }
        )
        .select("source_id");

      if (insErr) throw insErr;

      if (insertedRows) {
        totalInserted = insertedRows.length;
        for (const row of insertedRows) {
          insertedCountBySource[row.source_id] = (insertedCountBySource[row.source_id] || 0) + 1;
        }
      }
    }

    // 4. Update last_fetched_at for all successful sources in a single query
    if (successfulSourceIds.length > 0) {
      const { error: updErr } = await db
        .from("sources")
        .update({ last_fetched_at: new Date().toISOString() })
        .in("id", successfulSourceIds);
      
      if (updErr) {
        console.error("Error updating last_fetched_at for sources:", updErr);
      }
    }

    // 5. Populate remaining results with insertion counts
    for (const res of fetchResults) {
      const { source, entries, error } = res;
      if (error) continue; // Already added to results above

      results.push({
        source: source.name,
        fetched: entries.length,
        inserted: insertedCountBySource[source.id] || 0,
      });
    }

    return NextResponse.json({ ok: true, totalInserted, results });
  } catch (err) {
    return NextResponse.json({ error: message(err) }, { status: 500 });
  }
}

// Permitir disparo por GET también (cómodo para Vercel Cron / pruebas).
export async function GET(req: NextRequest) {
  return POST(req);
}

function message(err: unknown): string {
  return err instanceof Error ? err.message : "Error desconocido";
}
