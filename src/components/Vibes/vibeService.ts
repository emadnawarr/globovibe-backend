import { PrismaClient } from "@prisma/client";
import { Vibe } from "./vibe.interface";
import { getDateRange } from "../Event/utils/dateExtraction";
import { analyzeSentiment } from "../../Services/Model/geminiService";
import { eventReadDto } from "../Event/utils/eventDto";

const prisma = new PrismaClient();

export interface IVibeService {
  fetchVibesForCountry(country_id: number, days: number): Promise<Vibe[]>;
  fetchUnanalyzedEvents(): Promise<eventReadDto[]>;
  insertVibe(event: eventReadDto, countryName: string): Promise<void>;
}

const vibeService: IVibeService = {
  fetchVibesForCountry: async (
    country_id: number,
    days: number
  ): Promise<Vibe[]> => {
    try {
      const { startDate, endDate } = getDateRange(days);

      const vibes = await prisma.mood.findMany({
        where: {
          country_id,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return vibes;
    } catch (error) {
      throw error;
    }
  },
  fetchUnanalyzedEvents: async (): Promise<eventReadDto[]> => {
    const unanalyzedEvents: eventReadDto[] = await prisma.event.findMany({
      where: {
        moods: {
          none: {},
        },
      },
      take: 10,
    });
    return unanalyzedEvents;
  },
  insertVibe: async (event, countryName): Promise<void> => {
    try {
      const sentiment = await analyzeSentiment(event, countryName);
      if (!sentiment) {
        console.warn(`⚠️ No sentiment returned for event ${event.id}`);
        return;
      }
      await prisma.mood.create({
        data: {
          type: sentiment.type,
          intensity: sentiment.intensity,
          date: event.publish_date,
          country_id: event.country_id,
          event_id: event.id,
        },
      });
      console.log("Inserted Vibe");
    } catch (error) {
      throw new Error("Vibe can't process!");
    }
  },
};
export default vibeService;
