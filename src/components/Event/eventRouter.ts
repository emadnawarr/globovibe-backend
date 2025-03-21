import { Router } from "express";
import eventService from "./eventService";
import { fetchAndInsertEvents } from "./eventController";

const eventRouter = Router();

eventRouter.post("/insertEvents", fetchAndInsertEvents(eventService));

export default eventRouter;
