import { Request, Response } from "express";
import { sendPrompt } from "./geminiService";

export const sendPromptToGemini = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).send({ error: "Prompt is required" });
      return;
    }

    const response = await sendPrompt(prompt);
    res.status(200).send({ text: response });
  } catch (error: any) {
    console.error("Error in Gemini Controller:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
