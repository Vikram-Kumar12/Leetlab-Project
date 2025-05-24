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
  // going to check the user role once again
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
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiError(
          400,
          "You are not allowed to create a problem , only a admin create a problem!",
        ),
      );
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      // ham aha par basically 'referenceSolution' ke object se [language, solutionCode] ko nikal rhe hai and ak array mein store kar rhe hai, by using Object.entries().

      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      // ab ham judge0 ka sare test cases ke liye submission ready karenge.
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions); // har test case ko ak token mil gya hoga

      const tokens = submissionResults.map((res) => res.token); // token ko extract kar liye

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
      message: "New Problem Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
});

export const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    include:{
      solvedBy:{
        where:{
          userId:req.user.id
        }
      }
    }
  }); // we used findMany() because we want all the problems, not any one.

  if (!problems) {
    return res.status(400).json(new ApiError(400, "No problem found!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Problems fetched successfully!", problems));
});

export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id: id },
  });
  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Problem found successfully!", problem));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id: id },
  });
  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

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

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiError(
          400,
          "You are not allowed to create a problem , only a admin create a problem!",
        ),
      );
  }

  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getJudge0LanguageId(language);
    if (!languageId) {
      return res
        .status(400)
        .json(new ApiError(400, `Language ${language} is not supported`));
    }

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
      if (result.status.id !== 3) {
        return res.status(400).json({
          error: `Testcase ${i + 1} failed for language ${language}`,
        });
      }
    }
  }

  const newProblem = await db.problem.update({
    where: { id },
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

  return res
    .status(201)
    .json(new ApiResponse(200, "Problem Updated Successfully", newProblem));
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id: id },
  });
  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiError(
          400,
          "You are not allowed to create a problem , only a admin create a problem!",
        ),
      );
  }

  await db.problem.delete({
    where: { id },
  });

  return res.status(204)
    .json(
      new ApiResponse(204, "Problem Deleted Successfully")
    );

});

export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    where:{
      solvedBy:{
        some:{
          userId:req.user.id
        }
      }
    },
    include:{
      solvedBy:{
        where:{
          userId:req.user.id
        }
      }
    }
  })

  res.status(200).json(
    new ApiResponse(200,"Solved problems fetched successfully!",problems)
  )

});
