import { Event } from "@/components/interfaces/event";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEvents = async (): Promise<Event[]> => {
  const events = await prisma.event.findMany();
  return events;
};

export default { getEvents };
