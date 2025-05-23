# Topic : Fron-End or Backend ko connect kese krte hai, uska process :

### ----------------------------------------------------------------------

# JWT Token ko Har API Request me Automatically Bhejna in React using Axios Interceptor
- 🔰 Introduction:
  - Agar aap React + Node.js ka use karke ek secure authentication system bana rahe hain, jisme user register, email verify, aur phir login karta hai, to aapko user ke login hone ke baad har API request ke saath JWT token bhejna padta hai.
  - Lekin kya aap soch rahe hain ki har baar manually header me token likhna padhega? Bilkul nahi. Aapka saviour hai — Axios Interceptor.

## 🧠 What is an Axios Interceptor?
    - Axios interceptor ek middleware hota hai jo har request ya response ke aane jaane ke beech me kaam karta hai.
    - Aap chahen to har request ke sath automatically kuch add/change kar sakte ho — jaise ki JWT token.

    - 🔑 Use-case: JWT Token ko Har Request ke Header me Bhejna:
        - Aap is token ko localStorage ya cookie me save kar lete ho.
        - Ab jab bhi user koi protected route hit karega, jaise:
        - **GET /api/v1/user/profile**
        - To backend expect karega:
        - **Authorization: Bearer <JWT_TOKEN>**
        - Agar ye nahi diya, to 401 Unauthorized aa jayega.

- ❌ Problem without Interceptor:
    - Agar aap manually token bhejna chahein to har request aise banani padhegi:
    -      axios.get("/api/v1/profile", {  headers: {  Authorization: `Bearer      {localStorage.getItem("token")}`
           }     });
    - Sochiye agar 10 API hai to 10 baar ye likhna padhega. Bohot repetitive aur error-prone hai.

- ✅  Solution: Axios Interceptor
    - Interceptor har request se pehle ek kaam karta hai:
    - Check karta hai: Kya token localStorage me hai?
    - Agar hai: To usko request ke Authorization header me jod deta hai.
    -       axiosInstance.interceptors.request.use((config) => {  const token = localStorage.getItem("token");    if (token) {    config.headers.Authorization = `Bearer ${token}`;   }       return config;  });
    - Ab jab bhi aap axiosInstance.get("/profile") karenge, token automatic bhej diya jayega. Clean and secure!

## 🔐 What is withCredentials: true?
- Agar aap JWT token ko cookies me store karte ho (instead of localStorage), tab browser ko bolna padta hai:
- “Hey! Request ke sath cookies bhi bhejna.”
- Uske liye withCredentials: true use kiya jaata hai.
- **axios.create({    baseURL: "...", withCredentials: true,  });**
- Aapka current setup token ko localStorage me rakh raha hai, to ye optional hai — but good to keep for future flexibility.

## 🔄 Summary of Logic:
- Explanation:
    - User login karta hai → JWT token milta hai
    - Token ko localStorage me store karte ho aa phir cookies mein
    - Axios interceptor har request se pehle token uthata hai, local storage se
    - Token ko Authorization header me daal deta hai
    - Request ab secure endpoint pe jaata hai with token

## ✅ Conclusion
- Agar aap secure authentication system bana rahe hain React ke frontend me, to Axios Interceptor ka use karna must hai. Ye aapke JWT token ko har request ke sath bhejne me madad karta hai bina bar-bar manually likhne ke.
- Yeh chhoti si optimization aapke code ko:
    - Clean
    - Maintainable
    - Secure
    - bana deti hai.

## 🔗 Aapke liye next steps?
- Interceptor ko setup karo
- Token ko localStorage me securely store karo
- Logout pe token ko remove karna mat bhoolo
- Explore cookie-based JWT + withCredentials for even more secure flows!

### ------------------------------------------------------------------------


# 🔄 Line by Line code explanation: (axios.js - file)
<!-- import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1"
      : "api/v1",
  withCredentials: true,
});
// ✅ Interceptor to add token in headers automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); -->

## 🔸 First part : 
- ✅ export const axiosInstance = axios.create({ ... })
    - Ye line ek custom Axios instance create kar rahi hai.
    - axiosInstance naam se ek object banaya gaya hai jo Axios ka use karega.
    - export ka matlab hai: Is object ko dusri files mein bhi import kar ke use kiya ja sakta hai.

-  ✅ baseURL: ...
    - baseURL ka matlab hai ki jo bhi API request bhejoge, uske aage ye base URL automatically lag jaayega.

-  🔍 Yeh condition check karti hai:
    - **import.meta.env.MODE === "development"**
        - Agar aap development mode mein ho (jaise localhost pe kaam kar rahe ho), to:
            - **baseURL = "http://localhost:3000/api/v1"**
            - ➤ Iska matlab hai ki aapke backend server ka URL local machine pe hai.
        - Agar aap production mode mein ho (jaise deployed website), to:
            - **baseURL = "api/v1"**
            - ➤ Relative path use kiya jaata hai jab frontend aur backend same domain pe ho.

- ✅ withCredentials: true
- Iska matlab hai ki cookies, tokens, headers wagaira bhi cross-origin requests mein include kiye jayenge.
- Yani agar aap http://localhost:5173 se http://localhost:3000 par request bhej rahe ho, to browser usme cookies bhi bhejega.

## 🔸 Second part : 🔹 Interceptor:
- ✅ axiosInstance.interceptors.request.use(...)
    - Axios ka interceptor hai, jo har request ke jaane se pehle run hota hai.(middleware)
    - Iska kaam hai: Har outgoing request mein token automatically daalna.

- ✅ const token = localStorage.getItem("token");
    -  Ye line browser ke localStorage se token nikalti hai.
    - Jab user login karta hai to token ko localStorage mein store kiya jata hai.

- ✅ if (token) { config.headers.Authorization = Bearer ${token}; }
    - Agar token mila, to request ke headers mein ye line daali jaati hai:
    - Authorization: Bearer <token>
    - Ye header server ko batata hai ki:
    - "Request authenticated user se aayi hai. Ye uska token hai."

- ✅ return config;
    - Interceptor ko hamesha config return karna padta hai taaki Axios us modified request ko bhej sake.
