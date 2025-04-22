import bcrypt from "bcrypt";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const register = asyncHandler(async (req, res) => {

  const { email, password, name } = req.body; 
  if (!email || !password || !name) {
    return res.status(409).json(new ApiError(409, "All fileds are required!"));
  }

  const existingUser = await db.user.findUnique({
    // mongodb mein ham 'User' model ke base mein check karte hai lekin postgresql mein ham 'db' ke base mein check karte hai
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User Exists Already"));
  }

  const hashedPassword = await bcrypt.hash(password, 10); 
  
  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: UserRole.USER,
    },
  });
  if(!newUser){
    return res.status(400).json(
      new ApiError(400,"User not created",null)
    )
  }
  
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });   // *** jwt secret key generation step : 1. go to terminal then git bash 2. enter openssl rand -hex 32

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.status(201).json(
    new ApiResponse(201, "User Created Successfully!", {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    })
  );
  
});









const login = asyncHandler(async (req, res) => {});
const logout = asyncHandler(async (req, res) => {});
const profile = asyncHandler(async (req, res) => {});

export { register, login, logout, profile };
