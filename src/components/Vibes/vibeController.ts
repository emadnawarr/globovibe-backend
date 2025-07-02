import { analyzeSentiment } from "@/Services/Model/geminiService";
import { IVibeService } from "./vibeService";
import { ICountryService } from "../Country/countryService";
import { delay } from "@/utils/reusableFunctions";
import { Request, Response } from "express";

export interface ISentiment {
  type: string;
  intensity: number;
}

export const loadVibes =
  (vibeService: IVibeService, countryService: ICountryService) =>
  async (req: Request, res: Response) => {
    const DELAY_MS = 65 * 1000; // 65 seconds
    let hasMore = true;
    while (hasMore) {
      const events = await vibeService.fetchUnanalyzedEvents();
      if (events.length === 0) {
        hasMore = false;
        console.log("✅ All events processed.");
        break;
      }
      for (const event of events) {
        try {
          const countryName = await countryService.getCountryNameById(
            event.country_id
          );
          const sentiment = await analyzeSentiment(event, countryName);
          if (!sentiment) {
            console.warn(`⚠️ No sentiment returned for event ${event.id}`);
            continue;
          }
          await vibeService.insertVibe(event, sentiment);
        } catch (error) {
          console.error(`❌ Error processing event ${event.id}:`, error);
        }
      }
      console.log("⏳ Waiting for 65 seconds before next batch...");
      await delay(DELAY_MS);
    }
  };
