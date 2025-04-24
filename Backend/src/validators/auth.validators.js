// basically ham validation ke liye use karte hai. -> npm i express-validator
import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('firstname')
        .trim()
        .notEmpty().withMessage("Firstname is required")
        .isLength({min:3}).withMessage("Firstname should be at least 3 characters"),

        body('lastname')
        .trim()
        .notEmpty().withMessage("lastname is required")
        .isLength({min:3}).withMessage("lastname should be at least 3 characters"),

        body('role')
        .trim()
        .notEmpty().withMessage("role is required"),

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
