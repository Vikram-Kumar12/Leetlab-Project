import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { db } from "../libs/db.js";

// 📄 Purpose of this Code :
// Ye middleware ensure karta hai ki user authenticated hai ya nahi — yani login kiya hai ya nahi — before allowing access to protected routes.
export const isLoggedIn = async (req, res, next) => {

  try {

    // Yeh debugging ke liye hai — check karta hai ki cookies ya headers me token aa raha hai ya nahi.
    console.log("=== Auth Middleware Debug ====");
    console.log("Cookies :", req.cookies);
    console.log("Headers:", {
      cookie: req.headers.cookie,
      authorization: req.headers.authorization,
    });

    // 1. Authorization Header kya hota hai?
    // Jab bhi secure APIs se baat karni hoti hai, server ko batana padta hai ki:
    // "Main kaun hoon?" ya "Mujhe access dena chahiye ya nahi?"
    // Yeh batane ke liye client (jaise frontend ya Postman) Authorization naam ka HTTP header bhejta hai.

    // 2. Bearer kya hota hai?
    // "Bearer" ek keyword hai jo batata hai ki aap token-based authentication use kar rahe ho.

    // . req.cookies?.accessToken: Frontend se cookie me accessToken aaya ya nahi.
    // . Authorization Header: Agar cookie nahi mili to Authorization: Bearer <token> header me se token nikalta hai.
    // . .replace("Bearer", "") — Bas "Bearer" word hata raha hai.
    
    let token = req.cookies?.accessToken;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer", "").trim();
      console.log("No Token");
    }

    console.log("Token found : ", token ? "Yes" : "No");
    if (!token) {
      console.log("No Token");
      return res.status(401).json({
        success: false,
        message: "Authentication failed!",
      });
    }

    try {

      // . jwt.verify(...): Token ko verify karta hai (check karta hai ki valid hai ya nahi).
      // . Agar valid hua, decoded object me user ke details milte hain.
      // . req.user = decoded — Taki aage ke controller me req.user ka use ho sake.
      // . next() — Matlab agla middleware ya controller chalu ho jaye.
      // . If verification fails, 500 Internal Server Error ke saath response bhejta hai.
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("token verified successfully!");
      console.log("decode data : ", decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Token verified error :", error.message);
      return res.status(500).json({
        success: false,
        message: "Token verified error",
        error: error.message,
      });
    }
  } catch (error) {
    console.log("Auth middleware failure!");
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate token.",
      error: error.message,
    });
  }

};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("UserId :", userId);
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user || user.role !== "ADMIN") {
      return res
        .status(403)
        .json(new ApiError(403, "Access denied - Admins only!"));
    }
    next();
  } catch (error) {
    console.log("Error checking admin role (auth.middleware.js): ", error);
    return res.status(500).json(new ApiError(500, "Error checking admin role"));
  }
};

