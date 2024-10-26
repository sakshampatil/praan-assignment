import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

// Routes for auth apis
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.get("/refreshToken", authController.refreshToken);

export default router;
