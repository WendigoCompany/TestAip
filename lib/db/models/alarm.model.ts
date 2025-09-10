import { DataTypes } from "sequelize";
import { sequelize } from "../conection.ts";

export const Alarm = sequelize.define("Alarm", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  action: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "alarms",
  schema: "api",
  timestamps: false,
});
