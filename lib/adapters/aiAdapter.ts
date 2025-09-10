// // import { procesarEventoMock } from './mockAdapter.ts';
// import { procesarEventoReal } from './liveAdapter.ts';


// const USE_MOCK = process.env.USE_MOCK === 'true';

// export type Severidad = 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';

// export interface ResultadoIA {
//   resumen: string;
//   severidad: Severidad;
//   accion: string;
// }

// export async function procesarEvento(evento: string): Promise<ResultadoIA> {
//   // if (USE_MOCK) return procesarEventoMock(evento);
//   return await procesarEventoReal(evento);
// }



// Adapter selector: choose between mock or live AI processing
import { processMockEvent } from './mockAdapter.ts';
import { processLiveEvent } from './liveAdapter.ts';

// Flag to determine which mode is active (mock or real)
const USE_MOCK = process.env.USE_MOCK === 'true';

// Severity levels returned by the AI
export type Severity = 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';

// Structured result returned by the AI after processing an event
export interface AIResult {
  summary: string;
  severity: Severity;
  action: string;
}

// Main entry point: processes a security event and returns its classification
export async function processEvent(event: string): Promise<AIResult> {
  // If mock mode is enabled, use the mock adapter
  if (USE_MOCK) return processMockEvent(event);

  // Otherwise, use the live AI adapter
  return await processLiveEvent(event);
}
