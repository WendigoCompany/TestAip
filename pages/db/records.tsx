import RecordsViewer from '@/components/RecordsViewer.tsx';

export default function RecordsPage() {
  return (
    <main className="p-8 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Alarms Records</h1>
      <RecordsViewer />
    </main>
  );
}
