// export async function procesarEventoReal(texto: string): Promise<ResultadoIA> {
//   console.log("🚀 Enviando evento a Hugging Face:", texto);

//   const endpoint = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

//   const response = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputs: texto,
//       parameters: {
//         candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
//       },
//     }),
//   });

//   const data = await response.json();
//   console.log("📦 Respuesta Hugging Face:", JSON.stringify(data, null, 2));

//   const label = data?.labels?.[0] || "LOW";

//   const resultado: ResultadoIA = {
//     resumen: `Se detectó actividad sospechosa relacionada con: ${texto}`,
//     severidad: label as Severidad,
//     accion: sugerirAccion(label as Severidad),
//   };

//   console.log("✅ Resultado generado:", resultado);
//   return resultado;
// }

// function sugerirAccion(severidad: Severidad): string {
//   switch (severidad) {
//     case "CRITICAL": return "Activar protocolo de emergencia y aislar el sistema.";
//     case "HIGH": return "Bloquear el recurso y realizar análisis forense.";
//     case "MED": return "Monitorear actividad y registrar el evento.";
//     case "LOW": return "Documentar y continuar observación.";
//   }
// }


// import type { ResultadoIA, Severidad } from "./aiAdapter";

// export async function procesarEventoReal(texto: string): Promise<ResultadoIA> {
//   console.log("🚀 Enviando evento a Hugging Face:", texto);



// const model = "sileod/deberta-v3-large-tasksource-nli"; 




// const endpoint = `https://api-inference.huggingface.co/models/${model}`;





//   const response = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.HF_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputs: `Classify the severity of the following security event: ${texto}`,
//       parameters: {
//         candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
//       },
//     }),
//   });

//   const data = await response.json();
//   console.log("📦 Respuesta Hugging Face:", JSON.stringify(data, null, 2));

//   const label = data?.labels?.[0] || "LOW";
//   const score = data?.scores?.[0] || 0;

//   const resultado: ResultadoIA = {
//     resumen: `Se detectó actividad sospechosa relacionada con: ${texto}`,
//     severidad: label as Severidad,
//     accion: sugerirAccion(label as Severidad),
//   };

//   console.log("✅ Resultado generado:", resultado);
//   console.log("📊 Severidad:", label, "| Score:", score.toFixed(3));

//   return resultado;
// }

// function sugerirAccion(severidad: Severidad): string {
//   switch (severidad) {
//     case "CRITICAL": return "Activar protocolo de emergencia y aislar el sistema.";
//     case "HIGH": return "Bloquear el recurso y realizar análisis forense.";
//     case "MED": return "Monitorear actividad y registrar el evento.";
//     case "LOW": return "Documentar y continuar observación.";
//   }
// }

import type { ResultadoIA, Severidad } from "./aiAdapter.js";

export async function procesarEventoReal(texto: string): Promise<ResultadoIA> {
  console.log("🚀 Enviando evento a Hugging Face:", texto);

  const modelClasificacion = "sileod/deberta-v3-large-tasksource-nli";
  const endpointClasificacion = `https://api-inference.huggingface.co/models/${modelClasificacion}`;

  const response = await fetch(endpointClasificacion, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `Classify the severity of the following security event: ${texto}`,
      parameters: {
        candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
      },
    }),
  });

  const data = await response.json();
  console.log("📦 Respuesta Hugging Face:", JSON.stringify(data, null, 2));

  const label = data?.labels?.[0] || "LOW";
  const score = data?.scores?.[0] || 0;

  const accion = await generarAccionDinamica(texto, label);

  const resultado: ResultadoIA = {
    resumen: `Security event detected: ${texto}`,
    severidad: label as Severidad,
    accion,
  };

  console.log("✅ Resultado generado:", resultado);
  console.log("📊 Severity:", label, "| Score:", score.toFixed(3));

  return resultado;
}

async function generarAccionDinamica(evento: string, severidad: string): Promise<string> {
  const modelGenerativo = "google/flan-t5-large";
  const endpointGenerativo = `https://api-inference.huggingface.co/models/${modelGenerativo}`;

  const prompt = `Based on the following security event and its severity, suggest an appropriate action:\nEvent: ${evento}\nSeverity: ${severidad}\nAction:`;

  const response = await fetch(endpointGenerativo, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });
  console.log(response);
  

  const data = await response.json();
  const generated = data?.generated_text?.trim();

  console.log("🧠 Suggested Action:", generated);

  return generated || "No action suggested.";
}
