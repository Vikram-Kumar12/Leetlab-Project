import express from "express";
import {validate} from "../middlewares/validator.middlewares.js"
import {userRegistrationValidator, userLoginValidator, changePasswordValidator} from "../validators/auth.validators.js"
import {
  registerUser,
  verifyUser,
  resendVerificationEmail,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  forgotPasswordRequest,
  verifyYourEmailForChangePassword,
  changePassword,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";

const authRoutes = express.Router();

authRoutes.post("/register", userRegistrationValidator(), validate, registerUser);
authRoutes.get("/verify/:token",verifyUser);
authRoutes.post("/resendVerificationEmail", userLoginValidator(), validate, resendVerificationEmail);
authRoutes.post("/login", userLoginValidator(), validate, loginUser);
authRoutes.get("/refreshToken", refreshAccessToken);
authRoutes.post("/logout", isLoggedIn, logoutUser);
authRoutes.get("/profile", isLoggedIn, getUserProfile);
authRoutes.post("/forgot-password",isLoggedIn,forgotPasswordRequest)
authRoutes.get("/forgot-password-verification/:forgotPasswordToken",verifyYourEmailForChangePassword)
authRoutes.post("/changed-password/:forgotPasswordToken",changePasswordValidator(), validate, changePassword)

export default authRoutes;
