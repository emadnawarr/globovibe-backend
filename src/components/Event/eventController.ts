import { Request, Response } from "express";
import { IEventService } from "./eventService";
import { ICountryService } from "../Country/countryService";
import { chunk } from "@/utils/reusableFunctions";

const BATCH_SIZE = 30;
const BATCH_DELAY_MINUTES = 15;

export const fetchAndInsertEvents =
  (eventService: IEventService, countryService: ICountryService) =>
  async (req: Request, res: Response) => {
    try {
      const countries = await countryService.getAllCountries();
      const countryChunks = chunk(countries, BATCH_SIZE);

      countryChunks.forEach((batch, index) => {
        setTimeout(
          async () => {
            console.log(
              `⏳ Starting batch ${index + 1}/${countryChunks.length}`
            );
            for (const country of batch) {
              try {
                const articles = await eventService.fetchNewsFromAPI({
                  country: country.iso_code,
                  size: 10,
                });
                await eventService.insertNews(country.iso_code, articles);
                console.log(`✅ ${country.name} done!`);
              } catch (err: any) {
                console.error(`❌ Error with ${country.name}:`, err.message);
              }
            }
          },
          index * BATCH_DELAY_MINUTES * 60 * 1000
        );
      });

      res.status(202).json({
        success: true,
        message: `Scheduled ${countries.length} countries in ${countryChunks.length} batch(es).`,
      });
    } catch (err: any) {
      console.error("🚨 Batch scheduling failed:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch country list or schedule batch processing.",
        error: err.message,
      });
    }
  };
