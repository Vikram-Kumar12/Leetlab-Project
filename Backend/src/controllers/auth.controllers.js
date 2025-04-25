import bcrypt from "bcrypt";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  generateTemporaryToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";
import crypto from "crypto";
import { cookie } from "express-validator";

export const register = asyncHandler(async (req, res) => {
  // get data and velidate :
  const { firstname, lastname, username, email, password, role } = req.body;
  if (!firstname || !lastname || !username || !email || !password || !role) {
    return res.status(409).json(new ApiError(409, "All fileds are required!"));
  }

  // check user exists or not
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User Exists Already"));
  }

  // hashed password and genetate token :
  const hashedPassword = await bcrypt.hash(password, 10);
  const { unHashedToken, hashedToken, tokenExpiry } =
    await generateTemporaryToken();

  // create user :
  const newUser = await db.user.create({
    data: {
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER,
      verificationToken: hashedToken,
      verificationTokenExpiry: new Date(tokenExpiry),
    },
  });
  if (!newUser) {
    return res.status(400).json(new ApiError(400, "User not created", null));
  }

  // send email :
  const verificationUrl = `http://localhost:3000/api/v1/auth/verify/${unHashedToken}`;
  const mailGenContent = emailVerificationMailGenContent(
    newUser.username,
    verificationUrl
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
        user: {
          id: newUser.id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          username: newUser.username,
          email: newUser.email,
          role: role,
          image: newUser.image,
        },
      }
    )
  );
});

export const verify = asyncHandler(async (req, res) => {
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
    return res.status(409).json(new ApiError(409, "User not found!"));
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
      .status(400)
      .json(new ApiError(400, ERROR_MESSAGES.TOKEN_EXPIRED));
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
  });

  res.status(200).json(
    new ApiResponse(200, "User verify successfully!", {
      user: {
        id: updatedUser.id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    })
  );
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(409).json(new ApiError(409, "All fileds are required!"));
  }

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    console.log("Invalide email or password");
    return res
      .status(409)
      .json(new ApiError(409, "Invalide email or password"));
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Invalide email or password");
    return res.status(400).json({
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
    verificationUrl
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

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(409)
      .json(new ApiError(409, "Please provide email & password!"));
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
    return res.status(403).json(new ApiError(403, "Please verify your email before logging in."));
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const updatedUser = await db.user.update({
    where:{id:user.id},
    data:{
      refreshToken:refreshToken,
      // refreshTokenExpiry:Date.now() + 7 * 24 * 60 * 60 * 1000, // ❌ This is a number (timestamp)
      refreshTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ This is a Date object
    }
  })

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
    maxAge: 1000 * 60 * 60 * 24 * 7 , // 7 days
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
    })
  );

});

export const refreshAccessToken = asyncHandler(async(req,res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken){
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  const user = await db.user.findFirst({
    where:{refreshToken}
  })
  if (!user || !user.refreshTokenExpiry || user.refreshTokenExpiry < new Date()) {
    return res.status(401).json(new ApiError(401, "Refresh token expired or invalid"));
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
      accessToken
    })
  );

})

export const logout = asyncHandler(async (req, res) => {
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


export const profile = asyncHandler(async (req, res) => {

  const user = req.user
  console.log("UserData : ",user);
  
  res.status(200).json(
    new ApiResponse(200, "User Authentication Successfully!", {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
    })
  );
  
});
