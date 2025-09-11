import { useEffect, useState } from "react";

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
  const [filterDate, setFilterDate] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const res = await fetch("/api/get-records");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: Alarm[] = await res.json();
        setAlarms(data);
      } catch (err) {
        console.error("❌ Failed to fetch alarms:", err);
      }
    };
    fetchAlarms();
  }, []);

  const filtered = alarms.filter((alarm) =>
    filterDate ? alarm.timestamp.startsWith(filterDate) : true
  );

  const paginated = filtered.slice(page * limit, (page + 1) * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="p-8 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Records</h2>

      {/* Date filter */}
      <div className="mb-4">
        <label className="block mb-1">Filter by date (YYYY-MM-DD):</label>
        <input
          type="text"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setPage(0);
          }}
          placeholder="2025-09-11"
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-gray-100 w-full max-w-sm"
        />
      </div>

      {/* Limit selector */}
      <div className="mb-4">
        <label className="block mb-1">Show:</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(0);
          }}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-gray-100 w-full max-w-xs"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Alarm cards */}
      {paginated.map((alarm) => {
        const isExpanded = expandedId === alarm.id;

        return (
          <div
            key={alarm.id}
            onClick={() =>
              setExpandedId(isExpanded ? null : alarm.id)
            }
            className={`border rounded-lg p-4 mb-4 cursor-pointer transition-colors ${
              isExpanded
                ? "bg-blue-50 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800"
            } border-blue-300 dark:border-blue-500`}
          >
            <strong
              className={`block mb-2 ${
                !isExpanded ? "text-orange-500 dark:text-orange-400" : ""
              }`}
            >
              {new Date(alarm.timestamp).toLocaleString()}
            </strong>
            <p className={`${!isExpanded ? "text-orange-500 dark:text-orange-400" : ""}`}>
              {alarm.text}
            </p>

            {isExpanded && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Severity:</strong> {alarm.severity}
                </p>
                <p>
                  <strong>Summary:</strong> {alarm.summary}
                </p>
                <p>
                  <strong>Action:</strong> {alarm.action}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Pagination */}
      <div className="mt-6 flex items-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span>
          Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
