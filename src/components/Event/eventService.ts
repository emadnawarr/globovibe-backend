import { Prisma, PrismaClient } from "@prisma/client";
import fetchNews from "../../Services/News/fetchNews";
import INewsParams from "./interfaces/INewsParams";
import IArticle from "./interfaces/IArticle";
import { eventReadDto, mapEventsWriteDto } from "./utils/eventDto";
import countryService from "../Country/countryService";
import { getDateRange } from "./utils/dateExtraction";

const prisma = new PrismaClient();
export type eventWriteDto = Prisma.EventUncheckedCreateInput;

export interface IEventService {
  fetchAllNews(days: number, limit: number): Promise<eventReadDto[]>;
  fetchNewsForCountry(
    countryId: number,
    days: number,
    limit: number
  ): Promise<eventReadDto[]>;
  fetchNewsFromAPI(params: INewsParams): Promise<IArticle[]>;
  insertNews(country: string, articles: IArticle[]): Promise<void>;
  fetchEventByArticleId(article_id: string): Promise<eventWriteDto | null>;
}

const eventService: IEventService = {
  fetchNewsFromAPI: async (params: INewsParams) => {
    try {
      return await fetchNews(params);
    } catch (error) {
      throw error;
    }
  },

  insertNews: async (
    countryCode: string,
    articles: IArticle[]
  ): Promise<void> => {
    try {
      const countryId = await countryService.getCountryIdByName(countryCode);
      for (const article of articles) {
        const existingEvent = await eventService.fetchEventByArticleId(
          article.article_id
        );
        if (existingEvent) continue;
        const eventsToPost = mapEventsWriteDto(countryId, article);
        await prisma.event.create({ data: eventsToPost });
      }
    } catch (error) {
      throw error;
    }
  },

  fetchEventByArticleId: async (
    articleId: string
  ): Promise<eventWriteDto | null> => {
    const event: eventWriteDto | null = await prisma.event.findUnique({
      where: { article_id: articleId },
    });
    return event;
  },
  fetchNewsForCountry: async (
    countryId: number,
    days: number,
    limit: number
  ): Promise<eventReadDto[]> => {
    const { startDate, endDate } = getDateRange(days);
    const events = await prisma.event.findMany({
      where: {
        country_id: countryId,
        publish_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        moods: true,
        country: true,
      },
    });
    const sorted = events
      .filter((event) => event.moods.length > 0)
      .sort((a, b) => b.moods[0].intensity - a.moods[0].intensity)
      .slice(0, limit);

    return sorted;
  },
  fetchAllNews: async (
    days: number,
    limit: number
  ): Promise<eventReadDto[]> => {
    const { startDate, endDate } = getDateRange(days);

    const events = await prisma.event.findMany({
      where: {
        publish_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        moods: true,
        country: true,
      },
    });

    const sorted = events
      .filter((event) => event.moods.length > 0)
      .sort((a, b) => b.moods[0].intensity - a.moods[0].intensity)
      .slice(0, limit);

    return sorted;
  },
};
export default eventService;
