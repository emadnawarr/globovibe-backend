import express from "express";
import eventRouter from "./components/Event/eventRouter";

const app = express();
app.use(express.json());

app.use("/events", eventRouter);

export default app;
