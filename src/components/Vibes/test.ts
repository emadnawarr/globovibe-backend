import { analyzeSentiment } from "@/Services/Model/geminiService";
import { eventReadDto } from "../Event/utils/eventDto";

const testEvent = {
  description:
    "Protests erupted in the capital following new austerity measures, leading to several arrests.",
} as eventReadDto;

analyzeSentiment(testEvent, "France").then(console.log);
