import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error.js";
import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";

export const authMiddleware = async (req, res, next) => {
    try {

        const token = await req.cookies.jwt;
        if(!token){
            return res.status(401).json(
                {
                    message:"Token not found!",
                    success:false
                }
            )
        }

        let decoded;
        try {
            decoded = await jwt.verify(token,process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json(
                new ApiError(401,"Token not found! (auth.middleware.js)",error)
            )
        }

        const user = await db.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                role:true
            }
        })
        if(!user){
            return res.status(404).json(
                {
                    message:"User not found!",
                    success:false
                }
            )
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user (auth.middleware.js) :",error);
        res.status(500).json(
            new ApiError(500,"Error authenticating user (auth.middleware.js)",error)
        )
    }
    
}