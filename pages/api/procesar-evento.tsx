import type { NextApiRequest, NextApiResponse } from 'next';
import { procesarEvento } from '@/lib/adapters/aiAdapter.ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { evento } = req.body;
  if (!evento || typeof evento !== 'string') {
    return res.status(400).json({ error: 'Evento inválido' });
  }


  try {
    const resultado = await procesarEvento(evento);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
