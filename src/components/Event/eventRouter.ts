import { Router } from "express";
import eventService from "./eventService";
import { fetchAndInsertEvents, getNews } from "./eventController";
import countryService from "../Country/countryService";
import vibeService from "../Vibes/vibeService";

const eventRouter = Router();

eventRouter.post(
  "/loadEvents",
  fetchAndInsertEvents(eventService, countryService, vibeService)
);

eventRouter.get("/getNews", getNews(eventService));

export default eventRouter;
