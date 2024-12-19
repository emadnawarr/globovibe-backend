import { Router } from "express";
import { sendPromptToModel } from "./modelController";

const geminiRouter = Router();

// Define the endpoint for sending prompts to Gemini API
geminiRouter.post("/prompt", sendPromptToModel);

export default geminiRouter;
