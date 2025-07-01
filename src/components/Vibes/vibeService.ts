import { PrismaClient } from "@prisma/client";
import { Vibe } from "./vibe.interface";
import { eventWriteDto } from "../Event/eventService";
import { eventReadDto } from "../Event/utils/eventDto";
import { ISentiment } from "./vibeController";

const prisma = new PrismaClient();

export interface IVibeService {
  fetchVibesForCountry(country: string): Promise<Vibe[]>;
  fetchUnanalyzedEvents(): Promise<eventReadDto[]>;
  insertVibe(event: eventReadDto, sentiment: ISentiment): Promise<void>;
}

const vibeService: IVibeService = {
  fetchVibesForCountry: function (country: string): Promise<Vibe[]> {
    throw new Error("Function not implemented.");
  },
  fetchUnanalyzedEvents: async (): Promise<eventReadDto[]> => {
    const unanalyzedEvents: eventReadDto[] = await prisma.event.findMany({
      where: {
        moods: {
          none: {},
        },
      },
      take: 60,
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
