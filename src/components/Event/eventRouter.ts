import { Router } from "express";
import eventService from "./eventService";
import { fetchAndInsertEvents, getEvents } from "./eventController";

const eventRouter = Router();

eventRouter.get("/", getEvents(eventService));
eventRouter.post("/insertEvents", fetchAndInsertEvents(eventService));

export default eventRouter;
