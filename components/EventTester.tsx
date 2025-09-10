import { useEffect, useRef, useState } from "react";
import "@/styles/index.css";


export default function EventTester() {
  const [evento, setEvento] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<any>(null);

  const enviar = async () => {
    if (!evento.trim()) return; 
    try {
      setLoading(true)
      const res = await fetch("/api/procesar-evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento }),
      });
      const data = await res.json();
      setResultado(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error al procesar el evento:", error);
    }
  };

useEffect(() => {
  document.body.style.cursor = loading ? "wait" : "default";
  return () => {
    document.body.style.cursor = "default";  
  };
}, [loading]);

 useEffect(() => {
    if (evento === "" && textareaRef.current) {
      textareaRef.current.value = "";
    }
  }, [evento]);

  const handleChange = (e: any) => {
    setEvento(e.target.value);
  };
  return (
    <div>
      <textarea
        ref={textareaRef}
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
