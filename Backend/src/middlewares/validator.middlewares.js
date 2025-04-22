import {validationResult} from "express-validator"
import {ApiError} from "../utils/api-error.js"

export const validate = (req,res,next) => {
    const errors = validationResult(req);
    console.log("Request Body :",req.body);
    console.log(("Errors (validator.middlewares.js) :",errors));
    
    if(errors.isEmpty()) return next();

    const extractError = [];
    errors.array().map((err)=> 
        extractError.push({
            [err.path]:err.msg,
        })
    )
    throw new ApiError(422,"Recieved data in not valid (validator.middlewares.js) ",extractError);
}