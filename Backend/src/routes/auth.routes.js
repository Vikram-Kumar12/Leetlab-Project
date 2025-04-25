import express from "express";
import {validate} from "../middlewares/validator.middlewares.js"
import {userRegistrationValidator, userLoginValidator} from "../validators/auth.validators.js"
import {
  register,
  verify,
  resendVerificationEmail,
  login,
  refreshAccessToken,
  logout,
  profile,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";

const authRoutes = express.Router();

authRoutes.post("/register", userRegistrationValidator(), validate, register);
authRoutes.get("/verify/:token",verify);
authRoutes.post("/resendVerificationEmail", userLoginValidator(), validate, resendVerificationEmail);
authRoutes.post("/login", userLoginValidator(), validate, login);
authRoutes.get("/refreshToken", refreshAccessToken);

authRoutes.post("/logout", isLoggedIn, logout);
authRoutes.get("/profile", isLoggedIn, profile);

export default authRoutes;
