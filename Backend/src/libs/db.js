import {PrismaClient} from "../generated/prisma/index.js"

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;




/*
🔹 1. import { PrismaClient } from "../generated/prisma/index.js";
📚 Explanation:
- Prisma ke code generation ke baad, ek PrismaClient class generate hoti hai.
- Is line mein hum us PrismaClient ko import kar rahe hain, jo ki database ke saath connection banane ke liye use hota hai.
- Ye file usually prisma generate command ke baad banti hai (custom output directory ke case mein ../generated/prisma/index.js).

🔹 2. const globalForPrisma = globalThis;
📚 Explanation:
- globalThis ek special object hai jo har environment mein global context ko represent karta hai.
- Node.js mein: global
- Browser mein: window
- globalThis ka use karke hum ek global variable bana rahe hain — jisme PrismaClient ka reference store kar sakein.
- Ye singleton pattern follow karta hai — taaki development mode mein Prisma ke multiple instances na ban jayein, warna "Too many connections" error aa sakta hai.

🔹 3. export const db = globalForPrisma.prisma || new PrismaClient();
📚 Explanation:
- Pehle check kar raha hai: globalForPrisma.prisma already set hai ya nahi.
- Agar hai, to wahi use karo (reuse client).
- Agar nahi hai, to new PrismaClient() bana do (new connection setup).
- db ab ek PrismaClient instance ban gaya hai, jisse hum database ko access kar sakte hain throughout the app.

🔹 4. if (ProcessingInstruction.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
📚 Explanation:
- Production mein har request ke liye PrismaClient instance nahi banana chahiye.
- But development mode mein file baar-baar reload hoti hai (Hot Reloading), jisse har bar new client ban jata hai.
- Ye line ensure karti hai ki agar production ke alawa koi mode hai (like development), to global object mein PrismaClient ko cache kar lo — globalForPrisma.prisma = db.
*/