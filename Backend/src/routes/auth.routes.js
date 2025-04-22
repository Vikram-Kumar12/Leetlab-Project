import express from "express";
import {validate} from "../middlewares/validator.middlewares.js"
import {userRegistrationValidator} from "../validators/auth.validators.js"
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", userRegistrationValidator(), validate, register);



authRoutes.post("/login",login);
authRoutes.post("/logout",logout);
authRoutes.get("profile",profile);

export default authRoutes;
