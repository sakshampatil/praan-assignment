import { Router } from "express";
import * as deviceController from "../controllers/device.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

// Routes for device apis
router.post("/create", verifyToken, deviceController.createDevice);
router.put("/update/:deviceId", verifyToken, deviceController.updateDevice);
router.get("/list", verifyToken, deviceController.listDevices);
router.delete("/delete/:deviceId", verifyToken, deviceController.deleteDevice);

export default router;
