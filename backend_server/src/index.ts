import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

import authRouter from "./router/auth.routes";
import adminRoutes from "./router/admin.routes";
import userRoutes from "./router/user.routes";
import questionRoutes from "./router/question.routes";
import learningPathRoutes from "./router/learning-path.routes";
import cacheRoutes from "./router/cache.routes";
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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/learning-path", learningPathRoutes);
app.use("/api/v1/cache", cacheRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "API route not found",
  });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`app listening on http://localhost:9000`);
});
