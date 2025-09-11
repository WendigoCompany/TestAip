import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await prisma.alarm.findMany();
    res.status(200).json(records);
  } catch (err) {
    console.error('❌ Error en /api/records:', err);
    res.status(500).json({ error: 'Error al obtener registros' });
  }
}
