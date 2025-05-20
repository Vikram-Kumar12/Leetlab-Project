import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


export const getAllSubmission = asyncHandler(async(req,res)=>{

    const userId = req.user.id;
    if(!userId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: User ID not found")
        )
    }

    const submissions = await db.submission.findMany({
        where:{userId:userId}
    })

    res.status(200).json(
        new ApiResponse(200,"Submissions fetched successfully",submissions ?? [])
    )

})


export const getSubmissionsForProblem = asyncHandler(async(req,res)=>{

    const userId = req.user.id;
    if(!userId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: User ID not found")
        )
    }

    const problemId = req.params.problemId;
    if(!problemId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: Problem not found")
        )
    }

    const submissions = await db.submission.findMany({
        where:{
            userId:userId,
            problemId:problemId,
        }
    })

    res.status(200).json(
        new ApiResponse(200,"Submissions fetched successfully",submissions ?? [])
    )

})


export const getAllTheSubmissionsForProblem = asyncHandler(async(req,res)=>{

    const problemId = req.params.problemId;

    const submissions = await db.submission.count({
        where:{problemId:problemId}
    })

     res.status(200).json(
        new ApiResponse(200,"Submissions fetched successfully",{
            count:submissions
        })
    )
})