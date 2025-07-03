import { Router } from "express";
import eventService from "./eventService";
import { fetchAndInsertEvents, getNews } from "./eventController";
import countryService from "../Country/countryService";

const eventRouter = Router();

eventRouter.post(
  "/loadEvents",
  fetchAndInsertEvents(eventService, countryService)
);

eventRouter.get("/getNews", getNews(eventService));

export default eventRouter;
