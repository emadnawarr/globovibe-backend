import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.API_KEY_NEW!);

export const sendPrompt = async (
  prompt: string
): Promise<string | undefined> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    return;
  }
};
