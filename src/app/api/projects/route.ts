import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/projects — Lista todos los proyectos.
export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ projects: data ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
