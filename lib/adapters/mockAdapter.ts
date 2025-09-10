import { analizarEvento } from "@/lib/engines/severityEngine";
import type { ResultadoIA, Severidad } from "./aiAdapter";

export function procesarEventoMock(evento: string): ResultadoIA {
  const resultado = analizarEvento(evento);

  return {
    resumen: `Se detectó actividad sospechosa relacionada con: ${evento}`,
    severidad: resultado.severidad,
    accion: sugerirAccion(resultado.severidad),
  };
}

function sugerirAccion(severidad: Severidad): string {
  switch (severidad) {
    case "CRITICAL":
      return "Activar protocolo de emergencia y aislar el sistema.";
    case "HIGH":
      return "Bloquear el recurso y realizar análisis forense.";
    case "MED":
      return "Monitorear actividad y registrar el evento.";
    case "LOW":
      return "Documentar y continuar observación.";
  }
}
