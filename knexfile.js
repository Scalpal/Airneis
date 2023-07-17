const { resolve } = require("path");
const { config } = require("dotenv");

config();

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: resolve("src/api/db/migrations"),
    stub: resolve("src/api/db/migration.stub"),
  },
  seeds: {
    directory: resolve("src/api/db/seeds"),
  },
};

module.exports = knexfile;
