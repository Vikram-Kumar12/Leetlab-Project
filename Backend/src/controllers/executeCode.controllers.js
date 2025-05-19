import { pollBatchResults, submitBatch } from "../libs/judge0.libs.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const executeCode = asyncHandler(async (req, res) => {
    console.log("Bodys: ",req.body);
    
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
  const resuts = await pollBatchResults(tokens);
  console.log("Results :", resuts);

  res.status(200).json(new ApiResponse(200, "Code Executed successfully!"));
});
