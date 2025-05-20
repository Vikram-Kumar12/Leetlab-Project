import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.libs.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";

export const executeCode = asyncHandler(async (req, res) => {
  console.log("Bodys: ", req.body);

  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;

  // Step1. validate test-cases: means ham validate karenge ki jo mere test-case aa rhe hai wo array ke form mein aa rha hai aa nhi
  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    return res.status(400).json(
      new ApiError(400, "Invalid or missing test cases!", {
        error: "Invalid or missing test cases!",
      }),
    );
  }

  // Step2. Prepare each test cases for judge0 batch submission
  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
    // based64_encoded:false,
    // wait:false,
  }));
  console.log("Submissions : ", submissions);

  // Step3. Send this batch submissions to judge0
  const submitResponse = await submitBatch(submissions);
  console.log("SubmitResponse : ", submitResponse);

  // we get token from judge0
  const tokens = submitResponse.map((res) => res.token);
  console.log("Tokens :", tokens);

  // Step4. Poll judge0 ko for the result for all submited test-cases
  const results = await pollBatchResults(tokens);
  console.log("Results :", results);

  // Step5. Analyze the test results : ham har ak test case ke upr loop karenge and ham ak new array return kar rhe honge, and compare for each index ki (stdout === expected_outputs)
  let allPassed = true;
  const detailsResults = results.map((result, i) => {
    const stdout = result.stdout?.trim();
    const expected_output = expected_outputs[i]?.trim();
    const passed = stdout === expected_output;

    console.log(`TestCase #${i + 1}`);
    console.log(`Input ${stdin[i]}`);
    console.log(`Expected Output for testcase ${expected_output}`);
    console.log(`Actual output  ${stdout}`);
    console.log(`Matched : ${passed}`);

    if (!passed) allPassed = false;

    return {
      testCase: i + 1,
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      compileOutput: result.compileOutput || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory}KB` : undefined,
      time: result.time ? `${result.time}s` : undefined,
    };
  });
  console.log("Deatils Output :", detailsResults);

  // Step6. Check Problem is exist in data base or not
  const problemExists = await db.problem.findUnique({
    where: { id: problemId },
  });
  if (!problemExists) {
    throw new Error(`❌ Problem with id "${problemId}" does not exist in DB`);
  }

  // Step7. Store submission summary in DB
  const submission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailsResults.map((r) => r.stdout)),
      stderr: detailsResults.some((r) => r.stderr)
        ? JSON.stringify(detailsResults.map((r) => r.stderr))
        : null,
      compileOutput: detailsResults.some((r) => r.compileOutput)
        ? JSON.stringify(
            detailsResults.compileOutput.map((r) => r.compileOutput),
          )
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailsResults.some((r) => r.memory)
        ? JSON.stringify(detailsResults.map((r) => r.memory))
        : null,
      time: detailsResults.some((r) => r.time)
        ? JSON.stringify(detailsResults.map((r) => r.time))
        : null,
    },
  });

  // Step8. If all test-cases passed then mark the problem as solved for the current user
  if (allPassed) {
    const problemSolved = await db.problemSolved.upsert({
      // upsert: upsert ka tab use karte hai ham jab, shirf ak bar update karna ho, mtlb ki ak user ne ak problem(id:1) ko solve kiya then usko hamne 'problemSolved' data base mein saved kar diya, phir same user same problem(id:1) ko solve karta hai tab us case men ham usko dubara add nhi karte hai us case mein ham 'upsert' ka use karte hai.
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }

  // Step9. Save individual test case results using detailsResults
  const testCaseResults = detailsResults.map((result) => ({
    submissionId: submission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compileOutput,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));

  // Step10. save in database :
  await db.testCaseResult.createMany({
    data: testCaseResults,
  });

  const submissionWithTestCase = await db.submission.findUnique({
    where: { id: submission.id },
    include: { testCases: true },
  });

  res.status(200).json(
    new ApiResponse(200, "Code Executed successfully!", {
      submission: submissionWithTestCase,
    }),
  );

});
