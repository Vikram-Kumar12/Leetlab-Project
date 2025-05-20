import express from "express"
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions",isLoggedIn,getAllSubmission)
submissionRoutes.get("/get-submission/:problemId",isLoggedIn,getSubmissionsForProblem)
submissionRoutes.get("/get-submissions-count/:problemId",isLoggedIn,getAllTheSubmissionsForProblem)

export default submissionRoutes;