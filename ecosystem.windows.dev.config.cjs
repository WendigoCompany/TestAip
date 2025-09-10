module.exports = {
  apps: [
    {
      name: "db-monitor-dev",
      script: "lib/db/postgres.init.ts",
      interpreter: "./node_modules/.bin/tsx",
      watch: ["lib/db", "lib/models"],
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "next-dev",
      script: "cmd",
      args: "/c npm run dev",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
    }
  ],
};
