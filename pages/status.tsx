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
  const statusColor =
    status === "ok" 
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <main className="p-8 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">DB Health Check</h1>
      <p className="text-lg">
        Status: <strong className={statusColor}>{status}</strong>
      </p>
    </main>
  );
}
