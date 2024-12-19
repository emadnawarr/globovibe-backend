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
      const events = await eventService.getNews("us"); //TODO:countryCode
      let articles = events?.data?.articles;
      const countryName = "United States"; //TODO:countryName
      if (!countryName) {
        res.status(400).send({
          message: "The 'country' parameter is required in the request body.",
        });
        return; // Stop further execution
      }

      if (!articles || !Array.isArray(articles)) {
        res.status(400).send({
          message: "The 'articles' parameter must be a non-empty array.",
        });
        return; // Stop further execution
      }
      await eventService.insertEvents(articles, countryName);

      res.status(201).send({ message: "News articles inserted successfully." });
    } catch (error) {
      res.status(500).send(error);
    }
  };
