import express from "express";
import eventRouter from "./components/Event/eventRouter";
import vibeRouter from "./components/Vibes/vibeRouter";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://globovibe.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/events", eventRouter);
app.use("/vibes", vibeRouter);

export default app;
