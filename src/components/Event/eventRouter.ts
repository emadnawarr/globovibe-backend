import { Router } from "express";
import eventService from "./eventService";
import { getEvents, insertEvents } from "./eventController";

const eventRouter = Router();

eventRouter.get("/", getEvents(eventService));
eventRouter.post("/events", insertEvents(eventService));

export default eventRouter;
