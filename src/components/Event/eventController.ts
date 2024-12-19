import { Request, Response } from "express";

export const getEvents =
  (eventService: any) => async (req: Request, res: Response) => {
    try {
      const events = await eventService.getEvents();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  };

export const insertEvents =
  (eventService: any) => async (req: Request, res: Response) => {
    try {
      const events = await eventService.getNews("us"); //TODO:req.country endpoint
      console.log(events);
      //TODO:insert events in db
    } catch (error) {
      res.status(500).send(error);
    }
  };
