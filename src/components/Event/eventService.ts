import { Event } from "../interfaces/event";
import { PrismaClient } from "@prisma/client";
import fetchNews from "../../Services/News/fetchNews";
import { Category } from "@prisma/client";
import countryService from "../Country/countryService";

const prisma = new PrismaClient();

const getEvents = async (): Promise<Event[]> => {
  const events = await prisma.event.findMany();
  return events;
};
const insertEvents = async (
  articles: any[],
  countryName: string
): Promise<void> => {
  const countryId = await countryService.getCountryIdByName(countryName);

  if (!countryId) {
    throw new Error(`Country not found for: ${countryName}`);
  }

  const eventsToInsert = articles.map((article) => ({
    title: article.title || "Untitled",
    description: article.description || "No description available",
    content: article.content || "No content provided",
    category:
      Category[article.category as keyof typeof Category] || Category.OTHER, // Convert to enum
    publish_date: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : new Date().toISOString(),
    source: article.source?.name || "Unknown",
    country_id: countryId,
  }));

  await prisma.event.createMany({
    data: eventsToInsert,
    skipDuplicates: true,
  });
};

const getNews = async (country: string) => {
  return await fetchNews(country);
};

export default { getEvents, getNews, insertEvents };
