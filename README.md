# Sistema de Evaluación de Eventos de Seguridad

Esta API permite analizar eventos de seguridad en tiempo real o en modo simulado, clasificando su severidad y generando acciones sugeridas. Está diseñada para testeo multiplataforma, trazabilidad de inputs y despliegue auditado.

---

## Endpoint principal

### `/`

Procesa un evento textual y retorna su severidad, resumen y acción sugerida

---

## Variables de entorno

USE_MOCK=[Boolean]         # true para modo simulado, false para modo real
HF_API_KEY=[IA API KEY]    # Clave de acceso a modelos de HuggingFace


---

## Despligue Local

- npm install
- Luego, completar las variables de entorno en .env.example y renombrar a .env.local,

---

## Scripts disponibles

- npm run dev: Inicia la API en modo desarrollo
- npm run build: Compila la API para producción
- npm run start: Inicia la API en modo despliegue


---


## Live

🔗 [https://event-tester-api.vercel.app](https://event-tester-api.vercel.app)

