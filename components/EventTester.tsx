import { useState } from "react";

export default function EventTester() {
  const [evento, setEvento] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  const enviar = async () => {
    if (!evento.trim()) return; // Validación mínima
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
    }
  };

  const handleChange = (e: any) => {
    console.log(e);
    
    setEvento(e.target.value);
  };
  return (
    <div>
      <textarea
        value={evento}
        onChange={handleChange}
        placeholder="Escribí el evento..."
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={enviar}>Procesar evento</button>

      {resultado && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Resumen:</strong> {resultado.resumen}
          </p>
          <p>
            <strong>Severidad:</strong> {resultado.severidad}
          </p>
          <p>
            <strong>Acción sugerida:</strong> {resultado.accion}
          </p>
        </div>
      )}
    </div>
  );
}
