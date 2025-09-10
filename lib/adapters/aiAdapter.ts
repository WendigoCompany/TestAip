// import { procesarEventoMock } from './mockAdapter';
import { procesarEventoReal } from './liveAdapter';

const USE_MOCK = process.env.USE_MOCK === 'true';

export type Severidad = 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';

export interface ResultadoIA {
  resumen: string;
  severidad: Severidad;
  accion: string;
}

export async function procesarEvento(evento: string): Promise<ResultadoIA> {
  // if (USE_MOCK) return procesarEventoMock(evento);
  return await procesarEventoReal(evento);
}
