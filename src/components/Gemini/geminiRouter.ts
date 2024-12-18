import { Router } from "express";
import { sendPromptToGemini } from "./geminiController";

const geminiRouter = Router();

// Define the endpoint for sending prompts to Gemini API
geminiRouter.post("/prompt", sendPromptToGemini);

export default geminiRouter;
