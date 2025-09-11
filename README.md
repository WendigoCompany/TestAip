# Security Event Api

This API analyzes security-related textual events in real-time or simulated mode, classifies their severity, and suggests appropriate actions. Designed for cross-platform testing, input traceability, and auditable deployment.

---

##  Endpoints

| Method | Path             | Description                                                                 |
|--------|------------------|-----------------------------------------------------------------------------|
| `GET`  | `/`              | Main API entry point. Processes security events.                            |
| `GET`  | `/status`        | Performs a lightweight DB health check (`SELECT 1`).                        |
| `GET`  | `/db/records`    | Returns all alarm records from the database.                                |
| `GET`  | `/health`        | Redirects to `/status`. Useful for external probes or legacy compatibility. |
| `GET`  | `/docs`          | Displays endpoint documentation in-browser.                                 |

---

## Environment Variables

| Variable       | Type     | Description                                      |
|----------------|----------|--------------------------------------------------|
| `USE_MOCK`     | Boolean  | `true` for simulated mode, `false` for live mode |
| `HF_API_KEY`   | String   | HuggingFace API key for model access             |
| `DATABASE_URL` | String   | Database Url                                     |

> Define these in `.env.local` based on `.env.example`

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your config
npm run dev
