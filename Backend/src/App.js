import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import healthCheckRouter from "./routes/healthCheck.routes.js"
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";


const app = express();

// Middelwares :
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes :
app.use("/api/v1/healthCheck",healthCheckRouter)
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execute-code",executionRoute)
app.use("/api/v1/submission",submissionRoutes)
app.use("/api/v1/playlist",playlistRoutes)


export default app;
