import { useState } from "react";
import "@/styles/index.css";

export default function EventTester() {
  const [evento, setEvento] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const enviar = async () => {
    if (!evento.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/procesar-evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento }),
      });
      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error("Error al procesar el evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvento(e.target.value);
  };

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={darkMode ? "modo-oscuro" : "modo-claro"} style={{ position: "relative", minHeight: "100vh", padding: "1rem" }}>
      {loading && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            alt="Cargando..."
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      )}

      <button onClick={toggleTheme} style={{ marginBottom: "1rem" }}>
        {darkMode ? "🌞 Modo claro" : "🌙 Modo oscuro"}
      </button>

      <textarea
        value={evento}
        onChange={handleChange}
        disabled={loading}
        placeholder="Escribí el evento..."
        rows={4}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={enviar} disabled={loading}>
        {loading ? "Procesando..." : "Procesar evento"}
      </button>

      {resultado && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Resumen:</strong> {resultado.resumen}</p>
          <p><strong>Severidad:</strong> {resultado.severidad}</p>
          <p><strong>Acción sugerida:</strong> {resultado.accion}</p>
        </div>
      )}
    </div>
  );
}
