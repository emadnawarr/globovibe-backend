import { Request, Response } from "express";
import { IEventService } from "./eventService";
import { ICountryService } from "../Country/countryService";

export const fetchAndInsertEvents =
  (eventService: IEventService, countryService: ICountryService) =>
  async (req: Request, res: Response) => {
    try {
      const countries = await countryService.getAllCountries();

      countries.forEach((country, index) => {
        setTimeout(async () => {
          try {
            console.log(`⏳ Fetching events for ${country.name}...`);
            const articles = await eventService.fetchNewsFromAPI({
              country: country.iso_code,
              size: 5,
            });
            await eventService.insertNews(country.iso_code, articles);
            console.log(`✅ ${country.name} done!`);
          } catch (err: any) {
            console.error(`❌ Error with ${country.name}:`, err.message);
          }
        }, index * 35_000); // 35 seconds = 35,000 milliseconds
      });

      res.status(202).json({
        success: true,
        message: `Scheduled ${countries.length} countries to be processed every 35 seconds.`,
      });
    } catch (err: any) {
      console.error("🚨 Scheduling failed:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch country list or schedule processing.",
        error: err.message,
      });
    }
  };
