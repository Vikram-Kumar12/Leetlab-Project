import express from "express";
import {validate} from "../middlewares/validator.middlewares.js"
import {userRegistrationValidator, userLoginValidator} from "../validators/auth.validators.js"
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const authRoutes = express.Router();

authRoutes.post("/register", userRegistrationValidator(), validate, register);

authRoutes.post("/login", userLoginValidator(), validate, login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/profile", authMiddleware, profile);

export default authRoutes;
