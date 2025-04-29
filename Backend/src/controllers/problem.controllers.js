import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.libs.js";
import { ApiResponse } from "../utils/api-response.js";

export const createProblem = asyncHandler(async (req, res) => {
  // going to get the all the data from the request body
  // goingto check the user role once again
  // Loop through each reference solution for different languages.

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolution,
  } = req.body;

  // going to check the user role once again

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        // console.log(
        //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        // );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
});

export const getAllProblems = asyncHandler(async (req, res) => {});

export const getProblemById = asyncHandler(async (req, res) => {});

export const updateProblem = asyncHandler(async (req, res) => {});

export const deleteProblem = asyncHandler(async (req, res) => {});

export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {});
