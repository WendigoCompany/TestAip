module.exports = {
  apps: [
    {
      name: "db-monitor-prod",
      script: "lib/db/postgres.init.ts",
      interpreter: "./node_modules/.bin/tsx",
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "next-prod",
      script: "npm",
      args: "run start",
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
