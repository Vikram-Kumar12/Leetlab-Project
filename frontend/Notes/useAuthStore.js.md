# useAuthStore.js ka explanation:

## 🧠 Pehle Zustand hota kya hai?
- Zustand ek lightweight state management library hai React ke liye — Redux ka simpler version samajh lijiye. Iska fayda yeh hai ki:
    - Boilerplate nahi hota
    - Ek simple store bana kar har jagah state access/update kar sakte ho
    - Middleware, async actions (jaise API calls) bhi easily handle ho jati hain

## 🧩 Aapke useAuthStore ka Purpose kya hai?
- Ye ek global auth state handle karta hai:
    - 👤 authUser: Logged-in user ka data
    - 🔐 login, signup, logout functions
    - 📡 checkAuth: Page reload ke baad bhi user login hai ya nahi, ye check karta hai
    - ✅ Token ko automatically store aur clear karta hai
    - 🍞 Toast se user feedback deta hai / alert

## 🔄 Step-by-Step Functionality
- 1. authUser, isSigninUp, isLoggingIn, isCheckingAuth
    - Ye sab state variables hain jinke through UI ko update karte ho:
    - authUser → user info
    - isSigninUp → sign-up spinner ya button disable karne ke liye
    - isLoggingIn → login ke waqt loading indicator
    - isCheckingAuth → app boot hone ke baad auto-check ke liye

- 2. signup(data) — User Registration
    - data = name, email, password, etc.
    - Axios se /auth/register pe post request bheji jaati hai
    - 🔴 Important: Signup ke turant baad authUser set nahi kar rahe ho
    - Kyunki user ko pehle email verify karna padega
    - Toast show karta hai: "Please verify your email"
    - Why?
    - Secure apps always require email verification before login.

- 3. login(data) — User Login
    - /auth/login pe POST request bhejte ho
    - Response me milta hai:
        - ✅ accessToken
        - ✅ user info
    - Kya hota hai:
    - Token ko localStorage me store karte ho
    - User info authUser me set kar dete ho
    - Toast show hota hai: "Login successful"
    - 🛡️ Security Note:
        - JWT ko localStorage me store karna okay hai, lekin better option hota hai httpOnly cookie (for advanced use cases), http only means bas server ki access kar sake token, or koi nhi.

- 4. checkAuth() — Auto-login after page refresh
    - App reload hone pe isse call karte ho
    - /auth/profile se user data get karte ho
    - Token already localStorage me saved hota hai, aur Axios Interceptor use karke header me chala jata hai
    - 📥 If success → authUser set
    - 🚫 If failure → authUser = null (logged out)

- 5. logout()
    - /auth/logout call hota hai (server pe session clear karne ke liye, if applicable)
    - Token localStorage se remove
    - authUser null
    - Toast: "Logout successful"

- 🔍 Why Zustland Store for Auth?
    - 🌐 Auth state globally accessible hoti hai
    - 💾 Token store automatically ho jata hai
    - 🧼 UI clean aur logic centralized rehta hai
    - 🔁 Multiple components me same login state use kar sakte ho

- 🔄 Agar Ye Use Nahi Karte To?
    - Without Zustand	
    - Har component me useState banana padta	
    - Props drilling karni padti	
    - Reusability kam	
    - Scattered login/logout logic	