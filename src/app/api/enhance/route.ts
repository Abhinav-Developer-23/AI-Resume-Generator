import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const groqKeys = Object.keys(process.env).filter((k) =>
    k.toLowerCase().includes("groq")
  );
  const hasKey = groqKeys.some((k) => {
    const v = (process.env[k] || "").trim();
    return v.startsWith("gsk_") || v.length > 20;
  });

  return NextResponse.json({
    status: "ok",
    hasGroqKey: hasKey,
    groqEnvVariableNames: groqKeys,
    totalEnvVariables: Object.keys(process.env).length,
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Comprehensive case-insensitive search for any env variable containing "groq"
    let apiKey = "";
    let detectedKeyName = "";

    const directKeys = [
      process.env.GROQ_API_KEY,
      process.env.groq_api_key,
      process.env.NEXT_PUBLIC_GROQ_API_KEY,
      process.env.GROQ_KEY,
      process.env.GROQ_API,
    ];

    for (const k of directKeys) {
      if (k && k.trim().length > 10 && !k.includes("your_groq_api_key")) {
        apiKey = k.trim().replace(/^["'`]+|["'`]+$/g, "");
        break;
      }
    }

    if (!apiKey) {
      for (const [name, val] of Object.entries(process.env)) {
        if (!val) continue;
        const cleanName = name.trim().toLowerCase();
        if (cleanName.includes("groq")) {
          const cleanVal = val.trim().replace(/^["'`]+|["'`]+$/g, "");
          if (cleanVal.startsWith("gsk_") || cleanVal.length > 25) {
            apiKey = cleanVal;
            detectedKeyName = name;
            break;
          }
        }
      }
    }

    let customModel = "";
    for (const [name, val] of Object.entries(process.env)) {
      if (!val) continue;
      const cleanName = name.trim().toLowerCase();
      if (cleanName.includes("groq") && cleanName.includes("model")) {
        customModel = val.trim().replace(/^["'`]+|["'`]+$/g, "");
        break;
      }
    }

    const candidateModels = [
      customModel,
      process.env.GROQ_MODEL,
      "groq/compound-mini",
      "llama-3.1-8b-instant",
      "openai/gpt-oss-20b",
      "qwen/qwen3.8-27b",
      "qwen/qwen3.6-27b",
    ].filter(Boolean) as string[];

    const body = await req.json();
    const { action, text, context } = body;

    const groqKeysInEnv = Object.keys(process.env).filter((k) =>
      k.toLowerCase().includes("groq")
    );

    if (!text && action !== "generate_summary") {
      return NextResponse.json(
        { error: "Text or context is required for enhancement." },
        { status: 400 }
      );
    }

    if (!apiKey || apiKey.includes("your_groq_api_key")) {
      return NextResponse.json(
        {
          enhanced: mockEnhancement(action, text, context),
          isMock: true,
          notice:
            "GROQ_API_KEY not detected. Check Vercel environment variables for this project.",
          debug: {
            groqKeysFound: groqKeysInEnv,
            totalEnvVars: Object.keys(process.env).length,
          },
        },
        { status: 200 }
      );
    }

    const groq = new Groq({ apiKey });

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "shorten_bullet":
        systemPrompt = `You are an expert resume editor.
Shorten and condense the provided description into ONE punchy, high-impact resume bullet point (maximum 15-20 words).
Use the STAR method: Action verb + Tool + Result.
Remove all fluff and filler words. Return ONLY the single condensed bullet.`;
        userPrompt = `Raw text:\n"${text}"\n\nCondensed bullet:`;
        break;

      case "enhance_bullet":
        systemPrompt = `You are a professional resume writer and ATS optimization specialist.
Your job is to rewrite raw draft bullet points into polished, high-impact resume statements.
Rules:
1. Improve grammar, flow, and professional tone.
2. Structure using STAR: Strong Action Verb + Technical Tool/Context + Quantified Impact.
3. Keep it punchy (1-2 lines maximum, under 28 words).
4. Strictly do NOT invent fake companies or fake degrees. Refine candidate's real work.
5. Return ONLY the single polished bullet point without introduction or quotes.`;
        userPrompt = `Context: ${context ? JSON.stringify(context) : "Software project"}\nDraft bullet: "${text}"\n\nSingle polished bullet:`;
        break;

      case "generate_summary":
        systemPrompt = `You are a resume writer for professional engineers.
Generate a concise, impressive 2-sentence professional summary based on the provided candidate background.
Focus on core engineering competencies and domain strengths. Return ONLY the summary paragraph without quotes.`;
        userPrompt = `Candidate details:\n${JSON.stringify(context, null, 2)}\n\nProfessional summary:`;
        break;

      case "polish_text":
      default:
        systemPrompt = `You are a technical editor. Correct all grammar, elevate professional phrasing, and make the text crisp and impressive. Return ONLY the polished text.`;
        userPrompt = `Text to polish:\n"${text}"`;
        break;
    }

    let enhanced = "";
    let usedModel = "";
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_completion_tokens: 180, // Fast, lightweight, stays well within free tier limits
        });

        const raw = completion.choices[0]?.message?.content?.trim() || "";
        if (raw) {
          enhanced = raw
            .replace(/^["'`]+|["'`]+$/g, "")
            .replace(/^[-•*]\s*/, "")
            .trim();
          usedModel = model;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next...`, err.message);
      }
    }

    if (!enhanced) {
      throw lastError || new Error("Failed to generate enhancement from model.");
    }

    return NextResponse.json({
      enhanced,
      isMock: false,
      model: usedModel,
    });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to process AI enhancement.",
        fallback: mockEnhancement("fallback", ""),
      },
      { status: 500 }
    );
  }
}

function mockEnhancement(action: string, text: string, context?: any): string {
  if (action === "shorten_bullet") {
    return "Engineered scalable cloud backend with Next.js and Redis, cutting latency by 35%.";
  }
  if (action === "enhance_bullet") {
    const clean = (text || "built features").replace(/^[-•*]\s*/, "");
    return `Architected and deployed ${clean}, boosting computational throughput by 30% and enhancing system reliability.`;
  }
  if (action === "generate_summary") {
    const role = context?.title || "Software Engineer";
    const college = context?.education?.[0]?.college || "Top Tier Institute";
    return `Results-driven ${role} from ${college}, specializing in high-performance web applications and distributed cloud systems. Dedicated to writing clean, maintainable code with high architectural standards.`;
  }
  return "Engineered high-performance solution, integrating modern design patterns to ensure 99.9% uptime.";
}
