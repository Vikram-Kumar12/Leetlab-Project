import app from "./App.js";
import dotenv from "dotenv";

dotenv.config();
// dotenv ek npm package hai jo .env file se environment variables ko Node.js ke process mein load karta hai.
// Yani, .env file ke andar jo variables likhe hote hain, wo process.env ke andar aa jaate hain.

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});


/*
ak bar esko dekhiye pahale aap : 

1. leetlab/backend/src/index.js ka code : 
import app from "./App.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
}); 

2. leetlab/backend/src/App.js :
app.use(
  cors({
    // origin: "*"
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

3. leetlab/.env : PORT:3000

4. leetlab/docker-compose.yml :
backend:
    build: ./backend
    container_name: leetlab-backend
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - postgres
      - judge0

5. In vs-code terminal jab backend run karte hai :
npm run dev :  PORT = process.env.PORT || 4000;   mera port 4000 pr run dikha rh ahai okay.

6. jab docker mein jak ebackend mein jake dekhte hai to ye dikha rha hai :
sh: 1: nodemon: not found
> backend@1.0.0 dev
> nodemon src/index.js





*/