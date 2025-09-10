import { useEffect, useRef, useState } from "react";

export default function EventTester() {
  const [evento, setEvento] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<any>(null);
  const waitAnimation = useRef<any>(null);

  const enviar = async () => {
    if (!evento.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("/api/procesar-evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento }),
      });
      const data = await res.json();
      setResultado(data);
      waitAnimation.current.style.opacity = 0;
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      setLoading(false);
      console.error("Error al procesar el evento:", error);
    }
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        waitAnimation.current.style.opacity = 1;
      }, 1);
    }
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
      {loading && (
        <div
          ref={waitAnimation}
          style={{
            opacity: 0,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity .3s",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/Lightness_rotate_36f-L_cw.gif"
            alt="Cargando..."
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      )}

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
