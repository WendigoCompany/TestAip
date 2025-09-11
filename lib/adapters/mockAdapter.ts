import { analyzeEvent } from "@/lib/engines/severityEngine.ts";
import type { AIResult, Severity } from "./aiAdapter.ts";

// 🧪 Mock processor: simulates AI classification for testing purposes
export function processMockEvent(event: string): AIResult {
  const result = analyzeEvent(event);

  return {
    summary: `Suspicious activity detected related to: ${event}`,
    severity: result.severity,
    action: suggestAction(result.severity),
  };
}

// 🧭 Suggests an action based on severity level
function suggestAction(severity: Severity): string {
  switch (severity) {
    case "CRITICAL":
      return "Activate emergency protocol and isolate the system.";
    case "HIGH":
      return "Block the resource and perform forensic analysis.";
    case "MED":
      return "Monitor activity and log the event.";
    case "LOW":
      return "Document and continue observation.";
  }
}
