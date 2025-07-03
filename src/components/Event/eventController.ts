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

export const getNews =
  (eventService: IEventService) => async (req: Request, res: Response) => {
    try {
      const daysParam = req.query.days as string | undefined;
      const limitParam = req.query.limit as string;
      const countryIdParam = req.query.countryId as string | undefined;
      if (!daysParam || isNaN(Number(daysParam)) || Number(daysParam) < 1) {
        res.status(400).json({
          message:
            "`days` query parameter is required and must be a positive number.",
        });
        return;
      }
      const days = parseInt(daysParam, 10);

      const limit = parseInt(limitParam) || 10;

      if (
        countryIdParam &&
        (isNaN(Number(countryIdParam)) || Number(countryIdParam) < 1)
      ) {
        res.status(400).json({
          message: "`countryId` must be a valid positive number.",
        });
        return;
      }
      const countryId = countryIdParam
        ? parseInt(countryIdParam as string, 10)
        : null;
      const news = countryId
        ? await eventService.fetchNewsForCountry(countryId, days, limit)
        : await eventService.fetchAllNews(days, limit);

      res.status(200).json(news);
    } catch (error) {
      console.error("Error in getNews:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
