import app from "./App.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
// dotenv ek npm package hai jo .env file se environment variables ko Node.js ke process mein load karta hai.
// Yani, .env file ke andar jo variables likhe hote hain, wo process.env ke andar aa jaate hain.

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
