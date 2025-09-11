import { useEffect, useState } from 'react';

type Alarm = {
  id: number;
  text: string;
  severity: string;
  summary: string;
  action: string;
  timestamp: string;
};

export default function RecordsViewer() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterDate, setFilterDate] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchAlarms = async () => {
      const res = await fetch('/api/get-alarms');
      const data: Alarm[] = await res.json();
      setAlarms(data);
    };
    fetchAlarms();
  }, []);

  const filtered = alarms.filter(alarm =>
    filterDate ? alarm.timestamp.startsWith(filterDate) : true
  );

  const paginated = filtered.slice(page * limit, (page + 1) * limit);

  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📡 Alarmas registradas</h2>

      {/* Filtro por fecha */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Filtrar por fecha (YYYY-MM-DD): </label>
        <input
          type="text"
          value={filterDate}
          onChange={e => {
            setFilterDate(e.target.value);
            setPage(0);
          }}
          placeholder="2025-09-11"
        />
      </div>

      {/* Selector de cantidad */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Mostrar: </label>
        <select value={limit} onChange={e => {
          setLimit(Number(e.target.value));
          setPage(0);
        }}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Tarjetas */}
      {paginated.map(alarm => (
        <div
          key={alarm.id}
          onClick={() => setExpandedId(expandedId === alarm.id ? null : alarm.id)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            background: expandedId === alarm.id ? '#f9f9f9' : '#fff',
          }}
        >
          <strong>{new Date(alarm.timestamp).toLocaleString()}</strong>
          <p>{alarm.text}</p>

          {expandedId === alarm.id && (
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Severidad:</strong> {alarm.severity}</p>
              <p><strong>Resumen:</strong> {alarm.summary}</p>
              <p><strong>Acción:</strong> {alarm.action}</p>
            </div>
          )}
        </div>
      ))}

      {/* Paginación */}
      <div style={{ marginTop: '1rem' }}>
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
        >
          ⬅️ Anterior
        </button>
        <span style={{ margin: '0 1rem' }}>
          Página {page + 1} de {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}
