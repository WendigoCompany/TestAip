-- 🔧 Crear esquema si no existe
CREATE SCHEMA IF NOT EXISTS api;

-- 🧱 Crear tabla 'alarms'
CREATE TABLE IF NOT EXISTS api.alarms (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  severity TEXT NOT NULL,
  summary TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT now()
);

-- 🔐 Permisos para rol 'anon' (ajustable según tu política)
GRANT SELECT, INSERT, UPDATE, DELETE ON api.alarms TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA api TO anon;

-- 🧼 Opcional: asegurar que el esquema esté visible para PostgREST
GRANT USAGE ON SCHEMA api TO anon;
