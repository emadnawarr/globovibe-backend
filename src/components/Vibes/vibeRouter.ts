import { Router } from "express";
import { getAllVibes, loadVibes } from "./vibeController";
import countryService from "../Country/countryService";
import vibeService from "./vibeService";

const vibeRouter = Router();

vibeRouter.post("/loadVibes", loadVibes(vibeService, countryService));
vibeRouter.get("/getAllVibes", getAllVibes(vibeService, countryService));

export default vibeRouter;
