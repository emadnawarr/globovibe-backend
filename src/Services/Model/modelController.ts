import { Request, Response } from "express";
import { sendPrompt } from "./modelService";

export const sendPromptToModel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { country, newsContent } = req.body;

    if (!country || !newsContent) {
      res.status(400).send({ error: "Country and news content are required" });
      return;
    }

    // Dynamically construct the prompt
    const prompt = `
      Analyze the following news content for ${country}, written in the country's language, and provide a summary of the overall mood of the country:
      News Content: ${newsContent}
      What is the general mood of the country based on this news? Please answer with only one word, here are the options: happy, sad, neutral, and angry.
    `;

    const response = await sendPrompt(prompt);
    res.status(200).send({ text: response });
  } catch (error: any) {
    console.error("Error in Model Controller:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
