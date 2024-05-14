import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, DB_CONNECT_STRING } from "./config";
import router from "./routers";

const app: Express = express();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || "*");
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(router);

mongoose
  .connect(DB_CONNECT_STRING)
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.log("Error connecting to DB");
    console.log(error);
  });
