import { dbCheck, initDB } from "./dbControl.tsx";

(async () => {
  await initDB();
  dbCheck();
})();
