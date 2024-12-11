import { Router } from "express";
import eventService from "./eventService";
import { getEvents } from "./eventController";

const eventRouter = Router();

eventRouter.get("/", getEvents(eventService));

export default eventRouter;
