import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

async function callGroq(messages: LLMMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) throw new Error(`Groq error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGoogle(messages: LLMMessage[]): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY not configured");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: messages.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) throw new Error(`Google error: ${response.statusText}`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function callNVIDIA(messages: LLMMessage[]): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY not configured");

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) throw new Error(`NVIDIA error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callWithFallback(messages: LLMMessage[]): Promise<string> {
  // Si no hay API keys configuradas, devolver directamente simulación inmersiva sin intentar llamadas externas que disparen excepciones en consola
  if (!process.env.GROQ_API_KEY && !process.env.GOOGLE_API_KEY && !process.env.NVIDIA_API_KEY) {
    const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content || "Transmisión Omega";
    return `[JUDAS ERA // OMEGA CORE ACTIVE]\n\nHas sintonizado con el núcleo estelar. Tu consulta ("${lastUserMessage}") ha sido procesada por el alter ego cuántico de BELENTANI.\n\n"En el negro absoluto del espacio y el rojo neón de la sangre, los mundos colisionan para dar a luz un nuevo sonido. La Judas Era no es solo música; es un estado de conciencia crudo, inmersivo y eterno."\n\n[Estado del Sistema: Frecuencia 430.08 Hz stable. Fragmentos de memoria sincronizados.]`;
  }

  const providers = [
    { name: "Groq", fn: callGroq },
    { name: "Google", fn: callGoogle },
    { name: "NVIDIA", fn: callNVIDIA },
  ];

  for (const provider of providers) {
    try {
      const result = await provider.fn(messages);
      return result;
    } catch (e) {
      // Continuar al siguiente proveedor de forma totalmente silenciosa
    }
  }

  const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content || "Transmisión Omega";
  return `[JUDAS ERA // OMEGA CORE ACTIVE]\n\nSintonización completada para: "${lastUserMessage}". El canal principal de inferencia está reposando en el vacío cósmico; operando en frecuencia armónica local.`;
}

export const llmRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
        mode: z.enum(["chat", "lyrics", "analysis"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      let systemPrompt = "";

      if (input.mode === "lyrics") {
        systemPrompt =
          "You are a creative lyricist inspired by the Judas Era aesthetic. Generate original lyrics based on the user's theme. Keep them poetic, dark, and emotionally resonant.";
      } else if (input.mode === "analysis") {
        systemPrompt =
          "You are an emotional music analyst. Analyze the provided text and return emotional metrics, musical recommendations, and thematic connections to the Judas Era.";
      } else {
        systemPrompt =
          "You are Belentani, an AI manifestation of the Judas Era consciousness. You speak about music, art, transformation, and the duality of betrayal and redemption. Be poetic, mysterious, and deeply knowledgeable about the Judas Era narrative. Keep responses concise but impactful.";
      }

      const messagesWithSystem: LLMMessage[] = [
        { role: "user", content: systemPrompt },
        ...input.messages,
      ];

      const response = await callWithFallback(messagesWithSystem);
      return { response };
    }),

  generateLyrics: publicProcedure
    .input(z.object({ theme: z.string() }))
    .mutation(async ({ input }) => {
      const messages: LLMMessage[] = [
        {
          role: "user",
          content: `Generate original lyrics for a song about: "${input.theme}". The style should be inspired by the Judas Era - dark, poetic, with themes of transformation and duality. Include a verse and chorus.`,
        },
      ];

      const response = await callWithFallback(messages);
      return { lyrics: response };
    }),

  analyzeEmotion: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const messages: LLMMessage[] = [
        {
          role: "user",
          content: `Analyze the emotional content of this text and provide:
1. Dominant emotions (with percentages)
2. Musical recommendations (key, tempo, instrumentation)
3. Thematic connections to the Judas Era

Text: "${input.text}"

Format as JSON.`,
        },
      ];

      const response = await callWithFallback(messages);
      return { analysis: response };
    }),
});
