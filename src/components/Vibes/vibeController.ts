import { analyzeSentiment } from "@/Services/Model/geminiService";
import { IVibeService } from "./vibeService";
import { ICountryService } from "../Country/countryService";
import { delay } from "@/utils/reusableFunctions";
import { Request, Response } from "express";
import { generateSentimentAnalysis } from "./utils/sentimentAnalysis";
import { IVibesResponse } from "./vibe.interface";

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
          const country = await countryService.getCountryById(event.country_id);
          const sentiment = await analyzeSentiment(event, country.name);
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

export const getAllVibes =
  (vibeService: IVibeService, countryService: ICountryService) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const daysParam = req.query.days as string | undefined;
      if (!daysParam || isNaN(Number(daysParam)) || Number(daysParam) < 1) {
        res.status(400).json({
          message:
            "`days` query parameter is required and must be a positive number.",
        });
        return;
      }
      const days = parseInt(daysParam, 10);

      const countries = await countryService.getAllCountries();
      const allVibes: IVibesResponse[] = [];

      for (const country of countries) {
        const vibes = await vibeService.fetchVibesForCountry(country.id, days);
        const sentimentAnalysisForCountry = generateSentimentAnalysis(vibes);
        allVibes.push({ vibes, country, sentimentAnalysisForCountry });
      }

      res.status(200).json(allVibes);
    } catch (error) {
      console.error("Error in getAllVibes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
