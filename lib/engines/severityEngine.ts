import { Severidad } from "../adapters/aiAdapter";
console.log("🚨 Ejecutando analizarEvento");
export interface Regla {
  palabra: string;
  puntos: number;
  nivel: Severidad;
  tipo?: string;
}

const reglas: Regla[] = [
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



export interface AnalisisSeveridad {
  severidad: Severidad;
  puntuacion: number;
  coincidencias: Regla[];
  explicacion: string;
}



export function analizarEvento(evento: string): AnalisisSeveridad {
  const lower = evento.toLowerCase();
  let puntuacion = 0;
  const coincidencias: Regla[] = [];

  for (const regla of reglas) {
    if (lower.includes(regla.palabra)) {
      puntuacion += regla.puntos;
      coincidencias.push(regla);
    }
  }

  

  const niveles = coincidencias.map((r) => r.nivel);
  const highCount = niveles.filter((n) => n === "HIGH").length;
  const medCount = niveles.filter((n) => n === "MED").length;

  let severidad: Severidad = "LOW";

  if (niveles.includes("CRITICAL")) {
    severidad = "CRITICAL";
  } else if (highCount >= 3 || puntuacion >= 10) {
    severidad = "CRITICAL";
  } else if (highCount >= 2 || medCount >= 3) {
    severidad = "HIGH";
  } else if (puntuacion >= 3 || medCount >= 2) {
    severidad = "MED";
  }

  const explicacion = generarExplicacion(severidad, coincidencias);

  return { severidad, puntuacion, coincidencias, explicacion };
}

function generarExplicacion(severidad: Severidad, coincidencias: Regla[]): string {
  if (coincidencias.length === 0) return "No se detectaron patrones relevantes.";
console.log("🚨 Ejecutando analizarEvento");
  const tipos = coincidencias
    .map((r) => r.tipo)
    .filter(Boolean)
    .map((t) => t!.toLowerCase());

  const resumenTipos = tipos.length
    ? `Se detectaron patrones relacionados con: ${[...new Set(tipos)].join(", ")}.`
    : "Se detectaron múltiples coincidencias relevantes.";

  return `${resumenTipos} El evento fue clasificado como ${severidad} por la combinación de señales detectadas.`;
}
