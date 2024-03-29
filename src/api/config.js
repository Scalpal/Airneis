import knexfile from "../../knexfile.js";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(".env.local") });

const config = {
  port: 3000,
  baseURL: "http://localhost:3000",
  db: knexfile,
  security: {
    encrypt: process.env.SECURITY_ENCRYPT_KEY,
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET,
      expiresIn: "2 days",
    },
    password: {
      saltlen: 512,
      keylen: 512,
      iterations: 100000,
      digest: "sha512",
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
    },
    sendgrid: process.env.SENDGRID_KEY,
  },
};

export default config;
