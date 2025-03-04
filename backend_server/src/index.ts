import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

import userRouter from "./router/user.router";

configDotenv();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost/",
  })
);

app.use("/api/v1/auth/user", userRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "API route not found",
  });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`app listening on http://localhost:9000`);
});
