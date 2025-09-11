import OpenAI from "openai";
import type { AIResult, Severity } from "./aiAdapter.ts";

// HuggingFace client for suggestion generation
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

// Universal translation to English for multilingual input
async function translateInput(text: string): Promise<string> {
  interface HuggingFaceResponse {
    generated_text: string;
  }

  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-mul-en",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    }
  );

  const result = (await response.json()) as HuggingFaceResponse;
  return result?.generated_text?.trim() || text;
}

// Main processor: translates, classifies, and generates action
export async function processLiveEvent(
  originalText: string
): Promise<AIResult> {
  interface ClassificationResponse {
    labels: string[];
    scores: number[];
  }

  console.log("Original input received:", originalText);

  const translatedText = await translateInput(originalText);
  console.log("Translated text for classification:", translatedText);

  const classificationModel = "sileod/deberta-v3-large-tasksource-nli";
  const classificationEndpoint = `https://api-inference.huggingface.co/models/${classificationModel}`;

  const response = await fetch(classificationEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `Classify the severity of the following security event: ${translatedText}`,
      parameters: {
        candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
      },
    }),
  });

  const data = await response.json() as ClassificationResponse;
  const label = data?.labels?.[0] || "PROMPT ERROR";
  const score = data?.scores?.[0] || 0;

  const action = await generateSuggestion(originalText, label);

  const result: AIResult = {
    summary: `Security event detected: ${originalText}`,
    severity: label as Severity,
    action,
  };

  console.log("✅ Result generated:", result);
  return result;
}

// Generates contextual action suggestion based on event and severity
async function generateSuggestion(
  event: string,
  severity: string
): Promise<string> {
  const prompt = `${event}${severity}`;

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
      messages: [{ role: "user", content: prompt }],
    });

    let raw = chatCompletion.choices?.[0]?.message?.content || "";

    // 🧹 Clean up unwanted tags and formatting
    raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    return raw
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^-{3,}$/gm, "")
      .replace(/:\s*(?!\n)/g, ":\n")
      .replace(/-\s*(?!\n)/g, "- ")
      .replace(/\n{2,}/g, "\n\n")
      .trim();
  } catch (error) {
    console.error(error);
    return `${JSON.stringify(error)}`;
  }
}
