import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { initScheduler } from "./scheduler";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
  initScheduler();
});
