import type { NextApiRequest, NextApiResponse } from 'next';
import { procesarEvento } from '@/lib/adapters/aiAdapter.ts';
import { crearLogger } from '@/lib/utils/logger.ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = crearLogger();

  if (req.method !== 'POST') {
    logger.log("Método no permitido", { method: req.method });
    return res.status(405).end();
  }

  const { evento } = req.body;
  if (!evento || typeof evento !== 'string') {
    logger.log("Evento inválido", { body: req.body });
    return res.status(400).json({ error: 'Evento inválido' });
  }

  logger.log("Procesando evento", { evento });

  try {
    const resultado = await procesarEvento(evento);
    logger.log("Resultado generado", { resultado });
    res.status(200).json(resultado);
  } catch (err) {
    logger.log("Error procesando evento", { error: err });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
