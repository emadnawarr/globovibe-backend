import { ISentiment } from "@/components/Vibes/vibeController.js";
import { sendPrompt } from "./geminiModel";
import { eventReadDto } from "@/components/Event/utils/eventDto";

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
