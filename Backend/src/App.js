import express from "express";

const app = express();

// Middelwares :
app.use(express.json());

// Routes :
app.get('/',(req,res)=>{
    res.send("Hello Guys Welcome to LeetLab🔥")
})


export default app;
