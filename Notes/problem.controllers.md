# createProblem controller explanation :

## Pehle overall samajhte hain ye controller ka kaam kya hai?
- 👉 Ye createProblem controller ek naye problem ko database me create/save karta hai.
- Jaise LeetCode me naye questions add karte hain (admin panel se) — waise.
- Lekin bas save nahi karta, pehle verify karta hai ki:
- saari fields proper aayi hain ya nahi.
- user ka role ADMIN hai ya nahi.
- jo reference solution diya gaya hai (Python/JavaScript/Java me), wo testcases ko pass karta hai ya nahi.
-  Tab jaake final database me save karta hai.

# Ab start karte hain line-by-line full flow explanation:
### Line 1:
- ***export const createProblem = asyncHandler(async (req, res) => {***
- Hum ek async controller createProblem bana rahe hain.
- asyncHandler use kiya gaya hai jo async functions ke errors ko catch karta hai automatically (warna har baar try-catch likhna padta).
- req aur res Express.js ka request aur response object hai.

### line 16 to 55 basic things :
- ham pahale request body se sara required fields ko extract kar rhe
- then check kar rhe hai ki all fields properly fill hai na, koi empty to nhi hai na
- then uske bad check kar rhe hai ki, jo request kar rha hai wo ***ADMIN*** hi hai na, nhi to return kar do, kyuki ***createProblem*** controller ko bas **ADMIN** hi access kar sakta hai.

### Try-Catch Block (Main logic start)

# Line 26:
- ***try {for (const [language, solutionCode] of Object.entries(referenceSolution)) {***
- referenceSolution ek object hai: { "PYTHON": "code", "JAVA": "code" }
- Hum har language aur uske code ke liye loop chalayenge.

# Function Call: getJudge0LanguageId(language)
- ***const languageId = getJudge0LanguageId(language);***
- Har programming language ke liye Judge0 API ka ek specific ID hota hai.
- Ye function language ka naam lega aur ID dega.
- Jaise "PYTHON" ke liye 71, "JAVA" ke liye 62, "JAVASCRIPT" ke liye 63.
- Kyunki Judge0 API code ko language ID ke through hi samajhti hai (naam se nahi).

- ❗ Agar koi unknown language aa gayi, jaise "GOLANG" jo aapne support nahi kiya — to error de denge:
- ***if (!languageId) { return res.status(400).json(new ApiError(400, `Language ${language} is not supported`));}***
- Agar language support nahi karta (ID nahi mila), to 400 error.

# Prepare submissions for batch testing:
***const submissions = testcases.map(({ input, output }) => ({  source_code: solutionCode,  language_id: languageId,    stdin: input,   expected_output: output,    }));***
- Har testcase ke liye ek submission object banate hain.
- Jisme:
    - source_code — wo language ka reference code
    - stdin — input
    - expected_output — output
- ✅ Why? Har test case ke against reference solution ko verify karenge.

# Maan lijiye testcases diye hain:
    - [
    -   { "input": "5", "output": "25" },
    -   { "input": "3", "output": "9" }
    - ]
- Toh har testcase ke liye ek Judge0 submission object banega:
- Example ek object ka:
    - {
    -   "source_code": "print(int(input()) ** 2)",
    -   "language_id": 71,
    -   "stdin": "5",
    -   "expected_output": "25"
    - }
- Matlab hum Judge0 ko bol rahe hain:
    - "Yeh code run karo, input do 5, aur output 25 aana chahiye."


# Function Call: submitBatch(submissions)
***const submissionResults = await submitBatch(submissions);***
- Ye function Judge0 API par ek saath multiple submissions bhejta hai.
- Response me tokens milte hain.
# submitBatch function ke andar kya hota hai:
***const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, { submissions });                                  return data; // [{token},{token},{token}]***
- Ek POST request jaati hai Judge0 API pe.
- API response me har submission ka token aata hai.
-✅ Ye token isliye milta hai taaki baad me aap result check kar sako ki code successfully run hua ya nahi.


# Tokens se result check karna:
**const tokens = submissionResults.map((res) => res.token);**
**const results = await pollBatchResults(tokens);**
- Har token ke liye Judge0 API ko repeatedly poll karte hain (har 1 second baad check karte hain):
    - Kya Judge0 code ka result ready ho gaya?
    - Agar ready ho gaya, to result return karte hain.
- Ab har submission ke token se hum result nikalenge.
# Function Call: pollBatchResults(tokens)
- ***while (true) {                                                               const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, { params: { tokens: tokens.join(","), base64_encoded: false } });***
    - ***const results = data.submissions;***
    - ***const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);***
    - ***if (isAllDone) return results;***
    - ***await sleep(1000);***

- ✅ Polling function (pollBatchResults) repeat karta hai jab tak:
- Status "In Queue" (id = 1) ya "Processing" (id = 2) se hata nahi diya jaata.
- Jab saare submissions "Completed" (status id = 3) ho jaate hain tab results milte hain.

- ✅ Example ek result ka:
- {
-   "status": { "id": 3, "description": "Accepted" },
-   "stdout": "25",
-   "expected_output": "25"
- }

- Jab tak saare submissions complete nahi hote, 1 second ka wait karega (sleep(1000)).
- Jab sab complete ho jaaye, results return karega.
- ✅ Use of pollBatchResults: Judge0 me submissions thoda time lete hain, isiliye repeatedly check karte hain jab tak ready na ho.


# Test case pass ya fail check karna:
- ***for (let i = 0; i < results.length; i++) {                                 const result = results[i];                                                      return res.status(400).json(new ApiError(400, `Testcase ${i + 1} failed for language ${language}`));}***

# Jab sab pass ho jaaye tab database me save karo: (84-97)
- Jab reference solution perfect hai (testcases pass), tab hum database me naye problem ka entry karte hain.
- Ye Prisma ORM ka database call hai.
- Saara data save ho raha hai problem table me.

# Success Response:
- ***return res.status(201).json(new ApiResponse(201,newProblem))***
- Success hone pe 201 Created status ke saath naya problem bhej dete hain.

# Catch Block:
- Agar koi unexpected error aa jaata hai, to 500 Internal Server Error return karte hain.

# 🧠 Real-World Example se Sochiye:
- Maan lijiye aap ek exam conduct kar rahe hain:
    - Teacher (Aap) question create karte ho.
    - Pehle aap khud saare examples solve karte ho (testcases ke answers check karte ho).
    - Agar aapke answers galat aaye, to question exam me daalne ka koi sense nahi.
    - Jab aap khudka solve kiya hua question sahi nikle, tab aap usko database (exam) me daalte ho.
- Yehi kaam yahan ho raha hai automatically Judge0 ke through! 🔥

# ✅ Summary Table:
-    **Kya kar rahe hain?**	                    Kyun kar rahe hain?
- 1.    **Reference solution loop karna**       Har language verify karne ke liye
- 2.	 **Language ID nikalna Judge0**         API me code bhejne ke liye
- 3.	 **Batch submissions banana**	        Multiple testcases ek saath verify karne ke liye
- 4.	 **submitBatch se tokens lena**	        Code judge karwane ke liye
- 5.	 **pollBatchResults se results lena**	Judge0 se result aane ka wait karna
- 6.	 **Testcases validate karna**	        Galat solution ko rokne ke liye
- 7.	 **Problem DB me save karna**	        Saare checks pass karne ke baad
- 8.	 **Catch error karna**	                System crash se bachane ke liye
