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
  countryName: string,
  category?: Category
): Promise<void> => {
  const countryId = await countryService.getCountryIdByName(countryName);

  if (!countryId) {
    throw new Error(`Country ID not found for: ${countryName}`);
  }

  const eventsToInsert = articles.map((article) => ({
    title: article.title || "No title available",
    description: article.description || "No description available",
    content: article.content || "No content available",
    category: category || Category.OTHER,
    publish_date: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : new Date().toISOString(),
    source: article.source?.name || "Unknown",
    country_id: countryId,
  }));

  try {
    await prisma.event.createMany({
      data: eventsToInsert,
      skipDuplicates: true,
    });
    console.log("Events inserted successfully.");
  } catch (error: any) {
    console.error("Error inserting events into database:", error.message);
    throw error;
  }
};

const getNews = async (country: string, category?: Category) => {
  return fetchNews({ country, category });
};

export default { getEvents, getNews, insertEvents };
