import { randomUUID } from "crypto";
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "eventos.jsonl");

function asegurarArchivo() {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);
  if (!existsSync(LOG_FILE)) writeFileSync(LOG_FILE, "", { encoding: "utf-8" });
}

export function crearLogger(correlacionId?: string) {
  const id = correlacionId || randomUUID();
  asegurarArchivo();

  function log(mensaje: string, datos?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const entrada = {
      timestamp,
      correlacion: id,
      evento: mensaje,
      datos: datos || {},
    };

    console.log(`[${timestamp}] [correlacion:${id}] ${mensaje}`, datos || "");

    appendFileSync(LOG_FILE, JSON.stringify(entrada) + "\n", { encoding: "utf-8" });
  }

  return {
    id,
    log,
  };
}
