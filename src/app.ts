import express from "express";
import eventRouter from "./components/Event/eventRouter";
import geminiRouter from "./components/Gemini/geminiRouter";

const app = express();
app.use(express.json());

app.use("/events", eventRouter);
app.use("/gemini", geminiRouter);

export default app;
