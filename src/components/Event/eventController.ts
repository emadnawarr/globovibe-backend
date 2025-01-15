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
      const countryCode = "eg"; // TODO: Replace with dynamic value
      const category = "OTHER"; // TODO: Replace with dynamic value
      const countryName = "Egypt"; // TODO: Replace with dynamic value

      console.log("Fetching news with:", { countryCode, category });
      const events = await eventService.getNews(countryCode, category);

      if (
        !events ||
        !events.articles ||
        !Array.isArray(events.articles) ||
        events.articles.length === 0
      ) {
        console.error("No articles found or invalid response:", events);
        res.status(400).send({
          message: "The 'articles' parameter must be a non-empty array.",
        });
        return;
      }

      const articles = events.articles;

      if (!countryName) {
        console.error("Missing country name.");
        res.status(400).send({
          message: "The 'country' parameter is required in the request body.",
        });
        return;
      }

      await eventService.insertEvents(articles, countryName, category);

      res.status(201).send({ message: "News articles inserted successfully." });
    } catch (error: any) {
      console.error("Internal Server Error:", error.message, error.stack);
      res.status(500).send({ error: error.message });
    }
  };
