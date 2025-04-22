import express from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register",register);
authRoutes.post("/login",login);
authRoutes.post("/logout",logout);
authRoutes.get("profile",profile);

export default authRoutes;
