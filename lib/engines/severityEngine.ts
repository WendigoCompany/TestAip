import type { Severity } from "../adapters/aiAdapter.ts";

// Rule definition for pattern matching and scoring
export interface Rule {
  palabra: string;
  puntos: number;
  nivel: Severity;
  tipo?: string;
}

// Ruleset for severity classification
const rules: Rule[] = [
  { palabra: "ransomware", puntos: 5, nivel: "CRITICAL", tipo: "malware" },
  { palabra: "data breach", puntos: 5, nivel: "CRITICAL", tipo: "fuga de datos" },
  { palabra: "rootkit", puntos: 5, nivel: "CRITICAL", tipo: "persistencia" },
  { palabra: "/admin/config", puntos: 4, nivel: "CRITICAL", tipo: "acceso no autorizado" },
  { palabra: "modificación crítica", puntos: 4, nivel: "CRITICAL" },
  { palabra: "escalamiento de privilegios", puntos: 4, nivel: "CRITICAL" },
  { palabra: "sql injection", puntos: 4, nivel: "HIGH", tipo: "explotación" },
  { palabra: "inyección sql", puntos: 4, nivel: "HIGH" },
  { palabra: "ip externa", puntos: 3, nivel: "HIGH" },
  { palabra: "endpoint sensible", puntos: 3, nivel: "HIGH" },
  { palabra: "/api/user-data", puntos: 3, nivel: "HIGH" },
  { palabra: "tráfico distribuido", puntos: 2, nivel: "MED" },
  { palabra: "múltiples accesos", puntos: 2, nivel: "MED" },
  { palabra: "autenticación fallida", puntos: 1, nivel: "MED" },
  { palabra: "dominio sospechoso", puntos: 1, nivel: "MED" },
  { palabra: "repositorio de backups", puntos: 4, nivel: "CRITICAL" },
  { palabra: "credenciales cifradas", puntos: 4, nivel: "CRITICAL" },
  { palabra: "registros de auditoría", puntos: 3, nivel: "HIGH" },
  { palabra: "fuera del horario laboral", puntos: 2, nivel: "MED" },
  { palabra: "usuario interno", puntos: 1, nivel: "MED" },
  { palabra: "sin autorización explícita", puntos: 3, nivel: "HIGH", tipo: "acceso no autorizado" },
];

// Structured output of severity analysis
export interface SeverityAnalysis {
  severity: Severity;
  score: number;
  matches: Rule[];
  explanation: string;
}

// Main engine: analyzes event text and returns severity classification
export function analyzeEvent(event: string): SeverityAnalysis {
  const lower = event.toLowerCase();
  let score = 0;
  const matches: Rule[] = [];

  for (const rule of rules) {
    if (lower.includes(rule.palabra)) {
      score += rule.puntos;
      matches.push(rule);
    }
  }

  const levels = matches.map((r) => r.nivel);
  const highCount = levels.filter((n) => n === "HIGH").length;
  const medCount = levels.filter((n) => n === "MED").length;

  let severity: Severity = "LOW";

  if (levels.includes("CRITICAL")) {
    severity = "CRITICAL";
  } else if (highCount >= 3 || score >= 10) {
    severity = "CRITICAL";
  } else if (highCount >= 2 || medCount >= 3) {
    severity = "HIGH";
  } else if (score >= 3 || medCount >= 2) {
    severity = "MED";
  }

  const explanation = generateExplanation(severity, matches);

  return { severity, score, matches, explanation };
}

// Generates a textual explanation based on matched rules
function generateExplanation(severity: Severity, matches: Rule[]): string {
  if (matches.length === 0) return "No relevant patterns were detected.";

  console.log("🚨 Running analyzeEvent");

  const types = matches
    .map((r) => r.tipo)
    .filter(Boolean)
    .map((t) => t!.toLowerCase());

  const typeSummary = types.length
    ? `Detected patterns related to: ${[...new Set(types)].join(", ")}.`
    : "Multiple relevant matches were detected.";

  return `${typeSummary} The event was classified as ${severity} based on the combination of detected signals.`;
}