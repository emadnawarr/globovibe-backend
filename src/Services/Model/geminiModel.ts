import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY_NEW;
if (!apiKey) {
  throw new Error("Missing API_KEY_NEW environment variable");
}
const ai = new GoogleGenerativeAI(apiKey);

export const sendPrompt = async (
  prompt: string
): Promise<string | undefined> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    return;
  }
};
