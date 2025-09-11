import NavBar from '@/components/Nav.tsx';
import RecordsViewer from '@/components/RecordsViewer.tsx';

export default function RecordsPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <NavBar />
      <h1>📁 Registros de Alarma</h1>
      <RecordsViewer />
    </main>
  );
}
