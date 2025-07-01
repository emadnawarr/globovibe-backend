import { Router } from "express";
import eventService from "./eventService";
import { fetchAndInsertEvents } from "./eventController";
import countryService from "../Country/countryService";

const eventRouter = Router();

eventRouter.post(
  "/loadEvents",
  fetchAndInsertEvents(eventService, countryService)
);

export default eventRouter;
