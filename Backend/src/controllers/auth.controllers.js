import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  generateTemporaryToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import {
  emailVerificationMailGenContent,
  sendMail,
  forgotPasswordVerificationMailGenContent,
} from "../utils/mail.js";
import crypto from "crypto";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;
  if (!firstname || !lastname || !username || !email || !password || !role) {
    return res.status(400).json(new ApiError(400, "All fileds are required!"));
  }

  // const userName = await db.user.findUnique({
  //   where: { username },
  // });
  // if (userName) {
  //   return res.status(409).json(new ApiError(409, "Username Already Exists"));
  // }

  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(409).json(new ApiError(409, "User Exists Already"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { unHashedToken, hashedToken, tokenExpiry } =
    await generateTemporaryToken();

  const newUser = await db.user.create({
    data: {
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: role,
      verificationToken: hashedToken,
      verificationTokenExpiry: new Date(tokenExpiry),
    },
  });
  if (!newUser) {
    return res.status(503).json(new ApiError(503, "User not created", null));
  }

  const verificationUrl = `http://localhost:3000/api/v1/auth/verify/${unHashedToken}`;
  const mailGenContent = emailVerificationMailGenContent(
    newUser.username,
    verificationUrl,
  );
  await sendMail({
    email: newUser.email,
    subject: "Verify your email address",
    mailGenContent,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      "User Created and Verification email sent successfully",
      {
        unHashedToken,
        user: {
          id: newUser.id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          username: newUser.username,
          email: newUser.email,
          role: role,
          image: newUser.image,
        },
      },
    ),
  );
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    console.log("Token required!");
    return res.status(400).json(new ApiError(400, "Token required!"));
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.user.findFirst({
    where: { verificationToken: hashedToken },
  });
  if (!user) {
    console.log("User not found!");
    return res.status(401).json(new ApiError(401, "Token not found!"));
  }

  const ERROR_MESSAGES = {
    USER_ALREADY_VERIFIED: "User already verified!",
    TOKEN_EXPIRED: "Token expired, please request a new one.",
  };

  if (user.isVerified) {
    console.log("User already verified!");
    return res
      .status(409)
      .json(new ApiError(409, ERROR_MESSAGES.USER_ALREADY_VERIFIED));
  }

  const isTokenExpired = user.verificationTokenExpiry < new Date();
  if (isTokenExpired) {
    console.log("Token Expired!");
    return res
      .status(403)
      .json(new ApiError(403, ERROR_MESSAGES.TOKEN_EXPIRED));
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
  });
  return res.redirect("http://localhost:5173/signin");
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fileds are required!"));
  }

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    console.log("Invalide email or password");
    return res
      .status(401)
      .json(new ApiError(401, "Invalide email or password"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Invalide email or password");
    return res.status(401).json({
      success: false,
      message: "Invalide email or password",
    });
  }

  const ERROR_MESSAGES = {
    USER_ALREADY_VERIFIED: "User already verified!",
    TOKEN_EXPIRED: "Token expired, please request a new one.",
  };

  if (user.isVerified) {
    console.log("User already verified!");
    return res
      .status(409)
      .json(new ApiError(409, ERROR_MESSAGES.USER_ALREADY_VERIFIED));
  }

  // generate new token :
  const { unHashedToken, hashedToken, tokenExpiry } =
    await generateTemporaryToken();

  // update the database :
  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      verificationToken: hashedToken,
      verificationTokenExpiry: new Date(tokenExpiry),
    },
  });

  // send email :
  const verificationUrl = `http://localhost:3000/api/v1/auth/verify/${unHashedToken}`;
  const mailGenContent = emailVerificationMailGenContent(
    user.username,
    verificationUrl,
  );
  await sendMail({
    email: user.email,
    subject: "Verify your email address",
    mailGenContent,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Verification email send successfully!"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provide email & password!"));
  }

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  if (!user.isVerified) {
    return res
      .status(422)
      .json(new ApiError(422, "Please verify your email before logging in."));
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      refreshToken: refreshToken,
      // refreshTokenExpiry:Date.now() + 7 * 24 * 60 * 60 * 1000, // ❌ This is a number (timestamp)
      refreshTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ This is a Date object
    },
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  // console.log("Cookie set:", req.cookies); // 🔥 Log all cookies
  // console.log("Access token in cookie:", accessToken); // Or just log the token
  // console.log("Refresh token in cookie:", refreshToken); // Or just log the token

  res.status(200).json(
    new ApiResponse(200, "User Login Successfully!", {
      accessToken,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    }),
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  const user = await db.user.findFirst({
    where: { refreshToken },
  });
  if (
    !user ||
    !user.refreshTokenExpiry ||
    user.refreshTokenExpiry < new Date()
  ) {
    return res
      .status(401)
      .json(new ApiError(401, "Refresh token expired or invalid"));
  }

  const accessToken = await generateAccessToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return res.status(200).json(
    new ApiResponse(200, "New access token generated!", {
      accessToken,
    }),
  );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  const user = await db.user.findFirst({
    where: { refreshToken },
  });
  if (
    !user ||
    !user.refreshTokenExpiry ||
    user.refreshTokenExpiry < new Date()
  ) {
    return res
      .status(401)
      .json(new ApiError(401, "Refresh token expired or invalid"));
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      refreshToken: null,
      refreshTokenExpiry: null,
    },
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json(new ApiResponse(200, "User Logout Successfully!"));
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("UserData : ", user);
  res.status(200).json(
    new ApiResponse(200, "User Authentication Successfully!", {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    }),
  );
});

export const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    console.log("Required all fields!");
    return res.status(400).json(new ApiError(400, "Required all fields!"));
  }

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    console.log("Invalide credentials!");
    return res.status(401).json(new ApiError(401, "Invalide credentials!"));
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    await generateTemporaryToken();

  // I do this mistake and 🔥🔥🔥
  // user.forgotPasswordEmailisVerified = false;
  // user.forgotPasswordToken = hashedToken;
  // user.forgotPasswordTokenExpiry = tokenExpiry;
  await db.user.update({
    where: { id: user.id },
    data: {
      forgotPasswordEmailisVerified: false,
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: new Date(tokenExpiry),
    },
  });

  const verificationUrl = `http://localhost:3000/api/v1/auth/forgot-password-verification/${unHashedToken}`;
  const mailGenContent = forgotPasswordVerificationMailGenContent(
    user.username,
    verificationUrl,
  );
  await sendMail({
    email: user.email,
    subject: "Reset your password",
    mailGenContent,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "ForgotPassword verification email sent successfully in your e-mail address!",
      {
        user: {
          forgotPasswordToken: unHashedToken,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      },
    ),
  );
});

export const verifyYourEmailForChangePassword = asyncHandler(
  async (req, res) => {
    const { forgotPasswordToken } = req.params;
    console.log("Body :", forgotPasswordToken);

    if (!forgotPasswordToken) {
      console.log("ForgotPasswordToken is required!");
      return res
        .status(401)
        .json(new ApiError(401, "ForgotPasswordToken is required!"));
    }

    const hashedToken = await crypto
      .createHash("sha256")
      .update(forgotPasswordToken)
      .digest("hex");

    const user = await db.user.findFirst({
      where: { forgotPasswordToken: hashedToken },
    });
    if (!user) {
      console.log("ForgotPasswordToken is invalide!");
      return res
        .status(401)
        .json(new ApiError(401, "ForgotPasswordToken is invalide!"));
    }

    const ERROR_MESSAGES = {
      USER_ALREADY_VERIFIED: "User already verified!",
      TOKEN_EXPIRED: "Token expired, please request a new one.",
    };
    if (
      !user.forgotPasswordTokenExpiry ||
      user.forgotPasswordTokenExpiry < new Date()
    ) {
      console.log("Token Expired or missing expiry field!");
      return res
        .status(401)
        .json(new ApiError(401, ERROR_MESSAGES.TOKEN_EXPIRED));
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordEmailisVerified: true,
      },
    });
    res.redirect(
      `http://localhost:5173/change-password?token=${forgotPasswordToken}`,
    );
  },
);

export const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    console.log("All fields are required!");
    return res.status(400).json(new ApiError(400, "All fields are required!"));
  }

  if (newPassword !== confirmPassword) {
    console.log("Both password are different!");
    return res
      .status(400)
      .json(new ApiError(400, "Both password are different!"));
  }

  const { forgotPasswordToken } = req.params;
  if (!forgotPasswordToken) {
    return res.status(401).json(new ApiResponse(401, "Token is required!"));
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(forgotPasswordToken)
    .digest("hex");

  const user = await db.user.findFirst({
    where: {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: {
        gt: new Date(),
      },
    },
  });
  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, "Invalid or expired token"));
  }

  if (!user.forgotPasswordEmailisVerified) {
    return res
      .status(403)
      .json(new ApiResponse(403, "Please verify your email first!"));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id: user.id },
    data: {
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
      password: hashedPassword,
      forgotPasswordEmailisVerified: false,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});
