import { ISentiment } from "../../components/Vibes/vibeController";
import { sendPrompt } from "./geminiModel";
import { eventReadDto } from "../../components/Event/utils/eventDto";
import { IUserInputPrediction } from "@/components/Vibes/vibe.interface";

export const analyzeSentiment = async (
  event: eventReadDto,
  country: string
): Promise<ISentiment | undefined> => {
  try {
    const prompt = `
You are a sentiment analysis engine. Analyze the following news article about a country, and respond strictly in this JSON format:

\`\`\`json
{
  "type": "Positive" | "Negative" | "Neutral",
  "intensity": number // integer between 1 and 100
}
\`\`\`

Rules:
- The response MUST be a valid JSON object and nothing else.
- Use "Positive" if the article reflects optimism, progress, joy, or favorable developments.
- Use "Negative" if it involves conflict, crisis, tragedy, setbacks, or concerns.
- Use "Neutral" for factual or balanced reporting without clear emotional tone.
- "Intensity" reflects how emotionally strong or impactful the sentiment is.

Now analyze this:

Country: ${country}

Title: ${event.title}

Article: ${event.description}
    `.trim();

    const raw = await sendPrompt(prompt);

    if (!raw) return;

    // Try to extract and parse JSON safely
    const jsonMatch = raw.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const sentiment: ISentiment = JSON.parse(jsonMatch[0]);
      if (!sentiment) throw new Error("Unable to fetch sentiment!");
      return sentiment;
    } else {
      console.warn("Malformed response:", raw);
    }
  } catch (error: any) {
    console.error("Error in analyzeSentiment:", error.message);
  }
};

export const predictSentiment = async (
  userInput: string
): Promise<IUserInputPrediction[]> => {
  const prompt = `
Analyze the geopolitical and emotional impact of the following news text.
For each country that could be affected, return a JSON object with:
- country (as a name),
- sentiment (Positive, Neutral, or Negative),
- intensity (0-100).
Return only a JSON array.

Text: ${userInput}
`;

  const raw = await sendPrompt(prompt);

  if (!raw) throw new Error("No response from Gemini");

  // Attempt to extract and parse full JSON array
  const arrayMatch = raw.match(/\[\s*{[\s\S]*?}\s*]/);

  if (arrayMatch) {
    try {
      const sentimentArray: IUserInputPrediction[] = JSON.parse(arrayMatch[0]);
      return sentimentArray;
    } catch (err) {
      console.error("❌ JSON parse error:", err);
      throw new Error("Failed to parse Gemini response as JSON array.");
    }
  } else {
    console.warn(
      "⚠️ Gemini response did not include a valid JSON array:\n",
      raw
    );
    throw new Error("Malformed Gemini response.");
  }
};
