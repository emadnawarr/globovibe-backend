import { PrismaClient } from "@prisma/client";
import { Vibe } from "./vibe.interface";
import { eventReadDto } from "../Event/utils/eventDto";
import { ISentiment } from "./vibeController";

const prisma = new PrismaClient();

export interface IVibeService {
  fetchVibesForCountry(country_id: number, days: number): Promise<Vibe[]>;
  fetchUnanalyzedEvents(): Promise<eventReadDto[]>;
  insertVibe(event: eventReadDto, sentiment: ISentiment): Promise<void>;
}

const vibeService: IVibeService = {
  fetchVibesForCountry: async (
    country_id: number,
    days: number
  ): Promise<Vibe[]> => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (days - 1));
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();
      endDate.setHours(23, 59, 59, 999);

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
  insertVibe: async (event, sentiment): Promise<void> => {
    try {
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
      throw error;
    }
  },
};
export default vibeService;
