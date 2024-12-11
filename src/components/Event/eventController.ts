import { Request, Response } from "express";

export const getEvents =
  (eventService: { getEvents: () => any[] }) =>
  (req: Request, res: Response) => {
    try {
      const events = eventService.getEvents();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  };
