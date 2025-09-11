// pages/db/health.tsx
import { PrismaClient } from '@prisma/client';

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { props: { status: 'ok' } };
  } catch (err) {
    console.error('❌ DB Health Check Failed:', err);
    return { props: { status: 'error' } };
  } finally {
    await prisma.$disconnect();
  }
}

export default function HealthPage({ status }: { status: string }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🩺 DB Health Check</h1>
      <p>Status: <strong>{status}</strong></p>
    </main>
  );
}
