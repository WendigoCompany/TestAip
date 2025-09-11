// import type { NextApiRequest, NextApiResponse } from 'next';
// import { procesarEvento } from '@/lib/adapters/aiAdapter.ts';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { evento } = req.body;
//   if (!evento || typeof evento !== 'string') {
//     return res.status(400).json({ error: 'Evento inválido' });
//   }


//   try {
//     const resultado = await procesarEvento(evento);
//     res.status(200).json(resultado);
//   } catch (err) {
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }

// ##########################################


// import type { NextApiRequest, NextApiResponse } from 'next';
// import { processEvent } from '@/lib/adapters/aiAdapter.tsx';
// import { Alarm } from '@/lib/db/models/alarm.model.tsx';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { evento } = req.body;
//   if (!evento || typeof evento !== 'string') {
//     return res.status(400).json({ error: 'Invalid event input' });
//   }

//   try {
//     const result = await processEvent(evento);

//     // Persist the result in Neon via Sequelize
//     await Alarm.create({
//       text: evento,
//       severity: result.severity,
//       summary: result.summary,
//       action: result.action,
//       timestamp: new Date(),
//     });

//     res.status(200).json(result);
//   } catch (err) {
//     console.error('❌ Error processing or persisting event:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { processEvent } from '@/lib/adapters/aiAdapter.ts';
import { PrismaClient } from '@prisma/client';
import { log } from 'node:console';

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
