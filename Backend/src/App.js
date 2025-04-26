import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import healthCheckRouter from "./routes/healthCheck.routes.js"

const app = express();

// Middelwares :
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes :
app.use("/api/v1/healthCheck",healthCheckRouter)
app.use("/api/v1/auth",authRoutes); // authentication routes

export default app;
