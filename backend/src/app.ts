import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS ?? "").split(",")
  .map((origin) => origin.trim()).filter(Boolean)

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      };

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      };
      callback(new Error("not allowed by CORS"))
    },
    credentials: true,
  })
);

console.log("FRONTEND_URLS:", process.env.FRONTEND_URLS);
console.log("Allowed Origins:", allowedOrigins);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

export default app;