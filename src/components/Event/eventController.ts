import { Request, Response } from "express";
import IEventService from "./interfaces/IEventService";

export const getEvents =
  (eventService: any) => async (req: Request, res: Response) => {
    try {
      const events = await eventService.getEvents();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  };

export const fetchAndInsertEvents =
  (eventService: IEventService) => async (req: Request, res: Response) => {
    try {
      const country = "eg"; // TODO: different parameters from req from frontend
      const articles = await eventService.fetchNewsFromAPI({ country });
      await eventService.insertNews(country, articles);
      res.status(200).send({
        success: true,
        message: "News successfully fetched and inserted.",
      });
    } catch (error: any) {
      console.error("Error fetching and storing news: ", error);
      res.status(500).send({ success: false, message: error.message });
    }
  };
