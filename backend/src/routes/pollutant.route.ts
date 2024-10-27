import { Router } from "express";
import * as pollutantController from "../controllers/pollutant.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

// Routes for pollutant apis
router.post("/create", verifyToken, pollutantController.createPollutant);
router.get("/list/:deviceId", verifyToken, pollutantController.listPollutant);
router.get("/avgPollutant/:deviceId", verifyToken, pollutantController.getAvgPollutant);

export default router;
