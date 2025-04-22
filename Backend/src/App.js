import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";


const app = express();

// Middelwares :
app.use(express.json());
app.use(cookieParser());


// Routes :
app.get('/',(req,res)=>{
    res.send("Hello Guys Welcome to LeetLab🔥")
})

app.use("/api/v1/auth",authRoutes); // authentication routes







export default app;
