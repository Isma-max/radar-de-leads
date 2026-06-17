import { GoogleGenAI } from "@google/genai";
import type { Lead, NewsItem } from "./types";

// Modelo por defecto: Gemini 2.5 Flash, excelente velocidad y economía.
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

let _client: GoogleGenAI | null = null;
function client(): GoogleGenAI {
  if (_client) return _client;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "Falta GEMINI_API_KEY. Agrégala a tu .env.local (consíguela en Google AI Studio)."
    );
  }
  _client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return _client;
}

function newsContext(news: NewsItem): string {
  return [
    `Título: ${news.title}`,
    `Fuente: ${news.source_name ?? "desconocida"}`,
    `Categoría: ${news.category ?? "sin categoría"}`,
    `Fecha: ${news.published_at ?? "desconocida"}`,
    `URL: ${news.url}`,
    `Resumen: ${news.summary ?? "(sin resumen)"}`,
    `Señales detectadas por el scoring: ${news.signals.join(", ") || "ninguna"}`,
    `Score editorial (0-100): ${news.score}`,
  ].join("\n");
}

// ────────────────────────────────────────────────────────────────
// Generar lead: gancho, ángulo, por qué funciona, formato, advertencias.
// Usa structured outputs para garantizar un JSON parseable.
// ────────────────────────────────────────────────────────────────
export async function generateLead(news: NewsItem): Promise<Lead> {
  const systemInstruction = [
    "Eres un editor de contenidos para un canal chileno que produce videos cortos",
    "(Facebook, YouTube Shorts, TikTok y Reels). Tu trabajo es transformar una noticia",
    "en un 'lead' accionable para grabar un video rápido.",
    "Hablas en español de Chile, directo y sin relleno.",
    "Sé honesto sobre riesgos legales y reputacionales (presunción de inocencia,",
    "datos de menores, víctimas, contenido sensible, derechos de imagen, fuentes no verificadas).",
  ].join(" ");

  const prompt = [
    "A partir de esta noticia, genera un lead para un video corto.",
    "",
    newsContext(news),
    "",
    "Responde en español de Chile. Sé concreto y práctico.",
  ].join("\n");

  const schema = {
    type: "object",
    properties: {
      gancho: {
        type: "string",
        description:
          "Frase de apertura (hook) de 1-2 líneas para los primeros 3 segundos del video.",
      },
      angulo: {
        type: "string",
        description:
          "El ángulo editorial: desde qué enfoque contar la noticia para maximizar interés.",
      },
      porQueFunciona: {
        type: "string",
        description:
          "Por qué esta historia puede funcionar como video corto (emoción, conflicto, utilidad, etc.).",
      },
      formato: {
        type: "string",
        description:
          "Formato recomendado y duración aproximada (ej: 'Short vertical 30-45s con texto en pantalla').",
      },
      advertencias: {
        type: "string",
        description:
          "Advertencias legales y reputacionales relevantes. Si no hay, indícalo explícitamente.",
      },
    },
    required: [
      "gancho",
      "angulo",
      "porQueFunciona",
      "formato",
      "advertencias",
    ],
  };

  const response = await client().models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: schema as any,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("La respuesta de Gemini está vacía.");
  }
  return parseJson<Lead>(text);
}

// ────────────────────────────────────────────────────────────────
// Generar guion: texto limpio listo para locución.
// ────────────────────────────────────────────────────────────────
export async function generateScript(news: NewsItem): Promise<string> {
  const systemInstruction = [
    "Eres un guionista de videos cortos para un canal chileno.",
    "Escribes guiones para locución: texto plano, en español de Chile, que un locutor",
    "pueda leer de corrido. Nada de markdown, viñetas, ni acotaciones técnicas dentro del texto.",
    "Tono cercano, ritmo ágil, frases cortas. Duración objetivo: 30 a 60 segundos.",
    "No inventes datos que no estén en la noticia. Si falta información, mantén el guion general.",
  ].join(" ");

  const leadHint = news.lead
    ? [
        "",
        "Lead ya definido (respétalo):",
        `- Gancho: ${news.lead.gancho}`,
        `- Ángulo: ${news.lead.angulo}`,
        `- Formato: ${news.lead.formato}`,
      ].join("\n")
    : "";

  const prompt = [
    "Escribe el guion para locución de un video corto sobre esta noticia.",
    "",
    newsContext(news),
    leadHint,
    "",
    "Estructura (sin escribir estas etiquetas en la salida):",
    "1) Gancho potente en la primera frase.",
    "2) Desarrollo con lo esencial de la noticia.",
    "3) Cierre con una frase memorable o llamado a la interacción.",
    "",
    "Devuelve SOLO el texto del guion, listo para leer en voz alta.",
  ].join("\n");

  const response = await client().models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  return (response.text || "").trim();
}

// Parseo tolerante: si el modelo envuelve el JSON en ```json ... ``` lo limpia.
function parseJson<T>(raw: string): T {
  let text = raw.trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) text = fenced[1].trim();
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) text = text.slice(first, last + 1);
  return JSON.parse(text) as T;
}
