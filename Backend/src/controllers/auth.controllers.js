import bcrypt from "bcrypt";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { email, password, name } = req.body; // get data
  if (!email || !password || !name) {
    // validate data
    return res.status(409).json({
      message: "All fileds required!",
    });
  }

  try {
    const existingUser = await db.user.findUnique({
      // mongodb mein ham 'User' model ke base mein check karte hai lekin postgresql mein ham 'db' ke base mein check karte hai
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User Already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashedPassword

    const newUser = await db.user.create({
      // create new user
      data: {
        email,
        password: hashedPassword, // hashed password save kar rhe hai data base me, for saefty
        name,
        role: UserRole.USER,
      },
    });

    // generate JWt token
    const token = jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET,
        {expiresIn:"7d"},
    );
    // *** jwt secret key generation step :
    // 1. go to terminal then git bash
    // 2. enter openssl rand -hex 32

    // save token inside cookie
    res.cookie('jwt',token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== 'development',
        maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
    })

    // send response 
    res.status(201).json({
        message:"User Created Successfully!",
        user:{
            id:newUser.id,
            email:newUser.email,
            name:newUser.name,
            role:newUser.role,
            image:newUser.image
        }
    })
  } catch (error) {
    console.error("Error occures inside register controller :", error);
    res.status(500).json({
        error:"Error occures inside register controller :"
    })
  }
  
};












const login = async (req, res) => {};
const logout = async (req, res) => {};
const profile = async (req, res) => {};

export { register, login, logout, profile };
