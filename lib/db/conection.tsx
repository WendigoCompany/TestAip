import { Sequelize } from "sequelize";
import { Alarm } from "./models/alarm.model.tsx";

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: process.env.NODE_ENV !== "production",
});

