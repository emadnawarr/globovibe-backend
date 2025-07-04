import { Router } from "express";
import { getAllVibes } from "./vibeController";
import countryService from "../Country/countryService";
import vibeService from "./vibeService";

const vibeRouter = Router();

vibeRouter.get("/getAllVibes", getAllVibes(vibeService, countryService));

export default vibeRouter;
