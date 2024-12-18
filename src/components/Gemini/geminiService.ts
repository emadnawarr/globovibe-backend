import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY; // Ensure this is set in your .env file

if (!API_KEY) {
  console.error(
    "API key is missing! Ensure GEMINI_API_KEY is set in the .env file."
  );
  process.exit(1);
}

// Initialize the library
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the correct model (replace "gemini-1.5-flash" with the desired model)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendPrompt = async (prompt: string): Promise<string> => {
  try {
    console.log("Sending prompt to Gemini model...");
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error("Error communicating with Gemini model:", error.message);
    throw new Error("Failed to communicate with Gemini API");
  }
};
