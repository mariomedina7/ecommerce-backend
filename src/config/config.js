import { configDotenv } from 'dotenv'

configDotenv()

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
}

export const DB_CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017'
}

export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN
}

export const SESSION_CONFIG = {
  SECRET: process.env.SESSION_SECRET
}

export const SECURITY_CONFIG = {
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS)
}

export const EMAIL_CONFIG = {
  EMAIL_USER : process.env.EMAIL_USER,
  EMAIL_PASS : process.env.EMAIL_PASS
}

export const CONFIG = {
  server: SERVER_CONFIG,
  database: DB_CONFIG,
  jwt: JWT_CONFIG,
  session: SESSION_CONFIG,
  security: SECURITY_CONFIG,
  smtp: EMAIL_CONFIG
}

export default CONFIG 