import { Router } from "express";
import { getAllVibes, getUserInputPrediction } from "./vibeController";
import countryService from "../Country/countryService";
import vibeService from "./vibeService";

const vibeRouter = Router();

vibeRouter.get("/getAllVibes", getAllVibes(vibeService, countryService));
vibeRouter.post("/predictUserInput", getUserInputPrediction(vibeService))

export default vibeRouter;
