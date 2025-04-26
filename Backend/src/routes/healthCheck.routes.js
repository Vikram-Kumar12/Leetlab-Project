import express from "express"
import { healthcheck } from "../controllers/healthCheck.controllers.js"

const healthRoute = express.Router()

healthRoute.get("/",healthcheck)

export default healthRoute;