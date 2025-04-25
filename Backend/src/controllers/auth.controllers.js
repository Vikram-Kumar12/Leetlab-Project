import bcrypt from "bcrypt";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { generateTemporaryToken } from "../utils/generateToken.js";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";
import crypto from "crypto";

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
    new ApiResponse(201, "User Created Successfully!", {
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        role: role,
        image: newUser.image,
      },
    })
  );

});

export const verify = asyncHandler(async(req,res) => {

  const {token} = req.params;
  if(!token){
    console.log("Token required!");
    return res.status(400).json(
      new ApiError(400,"Token required!")
    )
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await db.user.findFirst({
    where:{verificationToken: hashedToken}
  })
  if(!user){
    console.log("User not found!");
    return res.status(409).json(
      new ApiError(409,"User not found!")
    )
  }

  const isTokenExpired = user.verificationTokenExpiry < new Date();
  if(isTokenExpired){
    console.log("Token Expired!");
    return res.status(400).json(
      new ApiError(400,"Token expired, resend its!")
    )
  }

  const updatedUser = await db.user.update({
    where:{id:user.id},
    data:{
      isVerified:true,
      verificationToken:undefined,
      verificationTokenExpiry:undefined,
    }
  })
  

  res.status(200).json(
    new ApiResponse(200,"User verify successfully!",{
      user: {
        id: updatedUser.id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    })
  )

})


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
    return res.status(401).json(new ApiError(401, "Invalide credentials"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json(new ApiError(401, "Invalide credentials"));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  }); // *** jwt secret key generation step : 1. go to terminal then git bash 2. enter openssl rand -hex 32

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.status(200).json(
    new ApiResponse(200, "User Login Successfully!", {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    })
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json(new ApiResponse(200, "User Logout Successfully!"));
});

export const profile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "User Authentication Successfully!", {
      user: req.user,
    })
  );
});

