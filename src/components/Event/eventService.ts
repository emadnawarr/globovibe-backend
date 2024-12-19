import { Event } from "@/components/interfaces/event";
import { PrismaClient } from "@prisma/client";
import fetchNews from "@/Services/News/fetchNews";
//TODO:interface for eventService
const prisma = new PrismaClient();

const getEvents = async (): Promise<Event[]> => {
  const events = await prisma.event.findMany();
  return events;
};

const getNews = async (country: string) => {
  return await fetchNews(country);
};

export default { getEvents, getNews };
