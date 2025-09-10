import EventTester from '@/components/EventTester.tsx';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Probador de Eventos de Seguridad</h1>
      <p>Modo activo: <strong>{process.env.NEXT_PUBLIC_USE_MOCK === 'true' ? 'Mock' : 'REAL'}</strong></p>
      <EventTester />
    </main>
  );
}
