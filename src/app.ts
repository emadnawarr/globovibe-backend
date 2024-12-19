import express from "express";
import eventRouter from "./components/Event/eventRouter";
import modelRouter from "./Services/Model/modelRouter";

const app = express();
app.use(express.json());

app.use("/events", eventRouter);
app.use("/model", modelRouter);

export default app;
