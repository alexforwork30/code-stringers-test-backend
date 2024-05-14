import dotenv from "dotenv";

dotenv.config();

export const DB_CONNECT_STRING = process.env?.DB_CONNECT_STRING || "";
export const PORT = process.env?.PORT || 3001;
export const AUTH_SECRET_KEY = process.env?.AUTH_SECRET_KEY || "";
export const AUTH_EXPIRE_TIME = process.env?.AUTH_EXPIRE_TIME || "1h";
