// basically ham validation ke liye use karte hai. -> npm i express-validator
import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('name')
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({min:3}).withMessage("Username should be at least 3 characters"),

        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalide")
        .toLowerCase().withMessage("Email should be lower case"),

        body('password')
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("Password should be at least 6 characters")
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalide")
        .toLowerCase().withMessage("Email should be lower case"),

        body('password')
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("Password should be at least 6 characters")
    ]
}

export {userRegistrationValidator, userLoginValidator};
