import { Event } from "../interfaces/event";
import { PrismaClient } from "@prisma/client";
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
    title: article.title,
    description: article.description || "No description provided",
    content: article.content || "No content provided",
    category: Category[article.category as keyof typeof Category], // Convert to enum
    publish_date: new Date(article.publishedAt),
    source: article.source || "Unknown",
    country_id: countryId,
  }));

  await prisma.event.createMany({
    data: eventsToInsert,
    skipDuplicates: true,
  });
};

export default { getEvents, insertEvents };
