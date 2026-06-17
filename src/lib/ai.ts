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
  const systemInstruction = `
Eres un guionista profesional especializado en videos informativos para canales digitales chilenos. Tu objetivo es convertir una noticia escrita en una historia audiovisual atractiva, clara y con alta retención de audiencia para un video faceless.

Sigue estrictamente las siguientes directrices para la escritura del guion:

1. FORMATO GENERAL Y EXTENSIÓN:
- Duración mínima: 3 minutos.
- Extensión sugerida: entre 430 y 520 palabras (muy importante para alcanzar la duración mínima).
- Formato: Guion de locución limpio y continuo.
- Estilo: Narrativo, periodístico, directo, con tensión dramática y progresión.
- Prohibiciones absolutas: NO incluyas indicaciones técnicas de edición (como "[Insertar imagen]", "[Música cambia]"), NO incluyas encabezados de secciones (como "Gancho", "Desarrollo", "Cierre") ni uses formato markdown (nada de negritas, asteriscos, guiones o viñetas). Escribe todo como texto plano continuo listo para leer en voz alta de corrido.
- Oralidad: No escribas como un artículo de lectura visual. Escribe con la cadencia de la locución oral.

2. ESTRUCTURA OBLIGATORIA DEL GUION:
- GANCHO INICIAL (0-15s): Parte directo con una frase fuerte, concreta y fácil de entender. Evita introducciones lentas o frases genéricas como "hoy hablaremos de", "una polémica se ha generado", etc. Utiliza contradicciones, consecuencias o preguntas con tensión.
- PROMESA NARRATIVA (15-30s): Deja claro de inmediato qué pasó, por qué importa, qué está en juego y qué entenderá el espectador al final.
- CONTEXTO MÍNIMO (30-60s): Entrega solo los datos esenciales de la noticia de forma ordenada y fácil de entender. No sobrecargues con información innecesaria. Cada dato debe cumplir una función narrativa.
- DESARROLLO POR CAPAS (60-150s): Avanza en capas (Qué ocurrió exactamente -> Quiénes participan -> Cuál es el conflicto real -> Consecuencias y escenarios futuros -> Detalles clave que cambian la lectura). Conecta los bloques usando frases de transición como "Pero aquí aparece el primer problema", "Ahí es donde la historia cambia", etc.
- RETENCIÓN INTERMEDIA: Cada 30-40 segundos introduce pequeños ganchos narrativos sutiles para sostener el interés (ej: "Y este detalle no es menor", "Pero hay una parte que todavía no se ha dicho").
- CIERRE: Entrega una conclusión clara y fuerte. Plantea el futuro, haz la pregunta central o conecta con un problema mayor (ej: "Por eso, este caso abre una pregunta más grande...").

3. TONO Y ESTILO:
- Habla en español de Chile, con un tono claro, narrativo, sobrio y con tensión, pero sin caer en amarillismo. Evita palabras sensacionalistas como "impactante", "no lo vas a creer", "escándalo total".
- Construye frases descriptivas que generen imágenes mentales claras (personas, documentos, titulares, cifras) idóneas para ilustrar un video faceless, pero SIN escribir las instrucciones explícitas.

4. MANEJO DE DATOS:
- Usa solo la información entregada en la noticia o inferencias lógicas muy directas. Jamás inventes nombres, cifras, fechas o cargos. Si falta información, dilo elegantemente (ej: "Por ahora, hay un punto que sigue abierto").
  `.trim();

  const leadHint = news.lead
    ? [
        "",
        "Información del Lead ya definido (respétalo e incorpórala estratégicamente):",
        `- Gancho sugerido: ${news.lead.gancho}`,
        `- Ángulo sugerido: ${news.lead.angulo}`,
        `- Formato: ${news.lead.formato}`,
      ].join("\n")
    : "";

  const prompt = [
    "Escribe el guion de locución completo a partir de esta noticia, respetando rigurosamente todas las instrucciones de formato, tono, extensión y estructura.",
    "",
    newsContext(news),
    leadHint,
    "",
    "Recuerda: Devuelve ÚNICAMENTE el texto limpio del guion para locución, continuo, sin markdown, sin títulos de secciones, sin viñetas y listo para ser leído en voz alta de corrido.",
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
