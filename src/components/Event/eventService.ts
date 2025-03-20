import { PrismaClient } from "@prisma/client";
import fetchNews from "../../Services/News/fetchNews";
import INewsParams from "./interfaces/INewsParams";
import IEventService from "./interfaces/IEventService";
import IArticle from "./interfaces/IArticle";
import { eventWriteDto, mapEventsWriteDto } from "./utils/eventDto";
import countryService from "../Country/countryService";

const prisma = new PrismaClient();

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
};

export default eventService;
