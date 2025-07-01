import { Router } from "express";
import { loadVibes } from "./vibeController";
import countryService from "../Country/countryService";
import vibeService from "./vibeService";

const vibeRouter = Router();

vibeRouter.post("/loadVibes", loadVibes(vibeService, countryService));

export default vibeRouter;
