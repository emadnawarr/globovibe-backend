import express from "express";
import eventRouter from "./components/Event/eventRouter";
import vibeRouter from "./components/Vibes/vibeRouter";

const app = express();
app.use(express.json());

app.use("/events", eventRouter);
app.use("/vibes", vibeRouter);

export default app;
