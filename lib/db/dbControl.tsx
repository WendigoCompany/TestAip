import { sequelize } from "@/lib/db/conection.tsx";
import { Alarm } from "./models/alarm.model.tsx";

const CHECK_INTERVAL_MS = 1000 * 60 * 60; 

export async function initDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    console.log("✅ Sequelize connected and synced.");
  } catch (err) {
    console.error("❌ Sequelize init error:", err);
  }
}



export function dbCheck() {
  const check = async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ DB is up and responding.");
    } catch (err) {
      console.warn("⚠️ DB unreachable. Attempting to sync...");
      try {
        await sequelize.sync();
        console.log("🔄 DB synced successfully.");
      } catch (syncErr) {
        console.error("❌ Failed to sync DB:", syncErr);
      }
    }
  };

  // Ejecuta inmediatamente y luego cada X tiempo
  check();
  setInterval(check, CHECK_INTERVAL_MS);
}
