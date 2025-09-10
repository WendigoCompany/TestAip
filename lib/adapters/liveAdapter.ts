

// import OpenAI from "openai";
// import type { ResultadoIA, Severidad } from "./aiAdapter.js";

// const client = new OpenAI({
//   baseURL: "https://router.huggingface.co/v1",
//   apiKey: process.env.HF_API_KEY,
// });

// // Traducción universal a inglés
// async function traducirEntrada(texto: string): Promise<string> {
//   const response = await fetch(
//     "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-mul-en",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HF_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({ inputs: texto }),
//     }
//   );
//   const result = await response.json();
//   return result?.generated_text?.trim() || texto;
// }

// export async function procesarEventoReal(
//   textoOriginal: string
// ): Promise<ResultadoIA> {
//   console.log("📥 Texto original recibido:", textoOriginal);

//   const textoTraducido = await traducirEntrada(textoOriginal);
//   console.log("🌐 Texto traducido para clasificación:", textoTraducido);

//   const modelClasificacion = "sileod/deberta-v3-large-tasksource-nli";
//   const endpointClasificacion = `https://api-inference.huggingface.co/models/${modelClasificacion}`;

//   const response = await fetch(endpointClasificacion, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.HF_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputs: `Classify the severity of the following security event: ${textoTraducido}`,
//       parameters: {
//         candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
//       },
//     }),
//   });

//   const data = await response.json();
//   const label = data?.labels?.[0] || "LOW";
//   const score = data?.scores?.[0] || 0;

//   // Usar el texto original para generación
//   const accion = await generarAccionConSmolLM(textoOriginal, label);

//   const resultado: ResultadoIA = {
//     resumen: `Security event detected: ${textoOriginal}`,
//     severidad: label as Severidad,
//     accion,
//   };

//   console.log("✅ Resultado generado:", resultado);
//   return resultado;
// }

// async function generarAccionConSmolLM(
//   evento: string,
//   severidad: string
// ): Promise<string> {
//   const prompt = `${evento}${severidad}`;

//   try {
//     const chatCompletion = await client.chat.completions.create({
//       model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
//       messages: [{ role: "user", content: prompt }],
//     });

//     let raw = chatCompletion.choices?.[0]?.message?.content || "";

//     // 🧹 Eliminar todo lo que esté dentro de <think>...</think>
//     raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

//     return (
//       raw
//         .replace(/^#{1,6}\s*/gm, "")
//         .replace(/^-{3,}$/gm, "")
//         .replace(/:\s*(?!\n)/g, ":\n")
//         .replace(/-\s*(?!\n)/g, "- ")
//         .replace(/\n{2,}/g, "\n\n")
//         .trim()
//     );
//   } catch (error) {
//     console.error("❌ Error en generación con SmolLM3:", error);
//     return "No action suggested due to generation error.";
//   }
// }


import OpenAI from "openai";
import type { ResultadoIA, Severidad } from "./aiAdapter.js";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

// Traducción universal a inglés
async function traducirEntrada(texto: string): Promise<string> {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-mul-en",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: texto }),
    }
  );
  const result = await response.json();
  return result?.generated_text?.trim() || texto;
}

export async function procesarEventoReal(
  textoOriginal: string
): Promise<ResultadoIA> {
  console.log("📥 Texto original recibido:", textoOriginal);

  // const textoTraducido = await traducirEntrada(textoOriginal);
  // console.log("🌐 Texto traducido para clasificación:", textoTraducido);

  // const modelClasificacion = "sileod/deberta-v3-large-tasksource-nli";
  // const endpointClasificacion = `https://api-inference.huggingface.co/models/${modelClasificacion}`;

  // const response = await fetch(endpointClasificacion, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.HF_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     inputs: `Classify the severity of the following security event: ${textoTraducido}`,
  //     parameters: {
  //       candidate_labels: ["LOW", "MED", "HIGH", "CRITICAL"],
  //     },
  //   }),
  // });

  // const data = await response.json();
  // const label = data?.labels?.[0] || "LOW";
  // const score = data?.scores?.[0] || 0;

  // // Usar el texto original para generación
  // const accion = await generarAccionConSmolLM(textoOriginal, label);

  // const resultado: ResultadoIA = {
  //   resumen: `Security event detected: ${textoOriginal}`,
  //   severidad: label as Severidad,
  //   accion,
  // };

  // console.log("✅ Resultado generado:", resultado);
  // return resultado;


// function normalizarYFormatearHTML(texto: string): string {
//   // Detectar y convertir cualquier **texto** en <strong>texto</strong>}


//   texto = texto.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();


//   let depurado = "";

//   let indexDeDepuramiento =[];

//   indexDeDepuramiento[0]  = texto.indexOf("**");
//   indexDeDepuramiento[1]  = texto.substring(indexDeDepuramiento[0] + 2).indexOf("**");
  


//   // do {
    
//   // } while (true);
//   // const html = texto.replace(/\*\*(.*?)\*\*/g, (_, contenido) => {
//   //   return `<strong>${contenido.trim()}</strong>`;
//   // });

//   // return html.trim();
// }

 
  const accion =  await generarAccionConSmolLM("", "")  ;
  const cosa : ResultadoIA = {
    resumen: `Security event detected: ORIGINAL`,
    severidad: "CRITICAL",
    accion
  };
  return cosa
}

async function generarAccionConSmolLM(
  evento: string,
  severidad: string
): Promise<string> {
  const prompt = `${evento}${severidad}`;

  try {
    // const chatCompletion = await client.chat.completions.create({
    //   model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
    //   messages: [{ role: "user", content: prompt }],
    // });

    // let raw = chatCompletion.choices?.[0]?.message?.content || "";

    // // 🧹 Eliminar todo lo que esté dentro de <think>...</think>
    // raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // return (
    //   raw
    //     .replace(/^#{1,6}\s*/gm, "")
    //     .replace(/^-{3,}$/gm, "")
    //     .replace(/:\s*(?!\n)/g, ":\n")
    //     .replace(/-\s*(?!\n)/g, "- ")
    //     .replace(/\n{2,}/g, "\n\n")
    //     .trim()
    // );
    return  '**Respuesta a la Inyección SQL y Modificación de Copia de Seguridad:\n' +
      '**\n' +
      '\n' +
      '1. **Acciones Inmediatas:\n' +
      '**\n' +
      '   - **Detener la Ataque:\n' +
      '** Desconecte el servidor de la red para evitar que el atacante acceda a otros recursos.\n' +
      '   - **Revisar Logs:\n' +
      '** Analice registros de errores de la aplicación y bases de datos para identificar intentos de inyección SQL.\n' +
      '   - **Revisar Permisos:\n' +
      '** Asegúrese de que los usuarios con acceso a `/admin/config` y al proceso de copia de seguridad tengan permisos mínimos y no privilegiados.\n' +
      '   - **Contenido del Backup:\n' +
      '** Verifique el contenido del archivo `backupHIGH` para detectar modificaciones no autorizadas (ej.:\n' +
      'archivos adicionales, cambios en permisos, o estructuras inusuales).\n' +
      '\n' +
      '2. **Investigación:\n' +
      '**\n' +
      '   - **SQL Injection:\n' +
      '** Analice el código de la aplicación para identificar vulnerabilidades en la lógica de consultas. Use herramientas como **OWASP ZAP** o **Burp Suite** para detectar inyecciones.\n' +
      '   - **Modificación de Backup:\n' +
      '** Verifique si el proceso de copia de seguridad fue alterado. Si el backup se realiza mediante scripts, revise si hay comandos maliciosos (ej.:\n' +
      '`mv`, `cp`, `rm`) o inyecciones SQL dentro del script.\n' +
      '   - **Auditoría de Permisos:\n' +
      '** Asegúrese de que los usuarios con acceso a la base de datos no puedan ejecutar comandos que afecten el backup.\n' +
      '\n' +
      '3. **Medidas de Seguridad:\n' +
      '**\n' +
      '   - **Prevenir Inyecciones SQL:\n' +
      '**\n' +
      '     - Use **consultas parametrizadas** (ej.:\n' +
      '`PreparedStatement` en Java) para evitar inyecciones.\n' +
      '     - Validar y sanitizar entradas de usuario.\n' +
      '     - Aplicar **WAF (Web Application Firewall)** para detectar y bloquear patrones de inyección.\n' +
      '   - **Proteger el Backup:\n' +
      '**\n' +
      '     - **Encriptar** los archivos de backup antes de almacenarlos.\n' +
      '     - **Auditear** el proceso de copia de seguridad para detectar modificaciones no autorizadas.\n' +
      '     - Limitar los permisos de acceso al backup a usuarios con roles de baja en la base de datos.\n' +
      '\n' +
      '4. **Monitoreo y Auditoría:\n' +
      '**\n' +
      '   - **Logs de Seguridad:\n' +
      '** Configure registros detallados para capturar intentos de inyección SQL y cambios en el backup.\n' +
      '   - **Revisión Regular:\n' +
      '** Realice auditorías periódicas de la base de datos y los archivos de backup para detectar anomalías.\n' +
      '\n' +
      '5. **Formación y Capacitación:\n' +
      '**\n' +
      '   - **Entrenamiento de Usuarios:\n' +
      '** Eduque a los usuarios sobre las consecuencias de SQL injection y las prácticas seguras.\n' +
      '   - **Phishing y Seguridad:\n' +
      '** Capacite a los usuarios para reconocer intentos de phishing y reportar actividades sospechosas.\n' +
      '\n' +
      '6. **Actualizaciones y Parches:\n' +
      '**\n' +
      '   - **Mantener Actualizados:\n' +
      '** Asegúrese de que la aplicación, bibliotecas y sistemas operativos estén al día con las últimas actualizaciones de seguridad.\n' +
      '   - **Revisión de Dependencias:\n' +
      '** Audite las dependencias externas (ej.:\n' +
      'frameworks, plugins) para asegurar que no tengan vulnerabilidades conocidas.\n' +
      '\n' +
      '7. **Plan de Respuesta a Incidentes:\n' +
      '**\n' +
      '   - **Contención:\n' +
      '** Isolar el sistema afectado y aislar recursos sensibles.\n' +
      '   - **Eradicación:\n' +
      '** Corregir vulnerabilidades identificadas y eliminar acceso no autorizado.\n' +
      '   - **Recuperación:\n' +
      '** Restaurar datos desde copias de seguridad válidas y aplicar parches de seguridad.\n' +
      '   - **Post- incidente:\n' +
      '** Notificar a stakeholders, realizar una revisión de riesgos y actualizar políticas de seguridad.\n' +
      '\n' +
      '8. **Consideraciones Adicionales:\n' +
      '**\n' +
      '   - **Verificar la Intención de "HIGH":\n' +
      '** Si "backupHIGH" es un typo, asegúrese de que el backup real se realice correctamente y se almacene en un lugar seguro.\n' +
      '   - **Auditoría Forense:\n' +
      '** Si es necesario, contrate a un equipo de seguridad forense para analizar la intrusión y documentar los hallazgos.\n' +
      '\n' +
      '**Conclusión:\n' +
      '** La inyección SQL y la modificación del backup son amenazas graves que requieren una respuesta rápida y exhaustiva. Implementar medidas preventivas, monitoreo constante y capacitación continua son clave para mitigar futuros riesgos. Si el ataque fue exitoso, es fundamental restaurar los datos desde copias de seguridad válidas y aplicar parches de seguridad.'
  } catch (error) {
    console.error("❌ Error en generación con SmolLM3:", error);
    return "No action suggested due to generation error.";
  }
}
