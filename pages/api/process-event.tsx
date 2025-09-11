import type { NextApiRequest, NextApiResponse } from 'next';
import { processEvent } from '@/lib/adapters/aiAdapter.ts';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { evento } = req.body;
  if (!evento || typeof evento !== 'string') {
    return res.status(400).json({ error: 'Invalid event input' });
  }

  try {
    const result = await processEvent(evento);

    
    // Persist the result in Neon via Prisma
    const alarm = await prisma.alarm.create({
      data: {
        text: evento,
        severity: result.severity,
        summary: result.summary,
        action: result.action,
        timestamp: new Date(),
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Error processing or persisting event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
