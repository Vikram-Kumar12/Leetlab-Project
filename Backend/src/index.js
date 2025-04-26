import app from "./App.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
