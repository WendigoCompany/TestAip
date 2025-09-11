import { sequelize } from "./conection.ts";
import { dbCheck, initDB } from "./dbControl.ts";

(async () => {
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS api;`);
  await initDB();
  dbCheck();
})();
