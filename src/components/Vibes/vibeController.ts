import { IVibeService } from "./vibeService";
import { ICountryService } from "../Country/countryService";
import { Request, Response } from "express";
import { generateSentimentAnalysis } from "./utils/sentimentAnalysis";
import { IVibesResponse } from "./vibe.interface";

export interface ISentiment {
  type: string;
  intensity: number;
}

export const getAllVibes =
  (vibeService: IVibeService, countryService: ICountryService) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const daysParam = req.query.days as string | undefined;
      if (!daysParam || isNaN(Number(daysParam)) || Number(daysParam) < 0) {
        res.status(400).json({
          message:
            "`days` query parameter is required and must be a positive number.",
        });
        return;
      }
      let days = parseInt(daysParam, 10);
      days = days + 1;

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

export const getUserInputPrediction =
  (vibeService: IVibeService) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userInput } = req.body;
      const prediction = await vibeService.predictUserInput(userInput);
      res.status(200).json({ prediction });
    } catch (error) {
      console.error("Error in prediction:", error);
      res.status(500).json({ message: "Error trying to predict user input!" });
    }
  };
