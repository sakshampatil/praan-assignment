import express, { Express, Request, Response, NextFunction } from "express";
import { useErrorHandler } from "../middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes
import auth from "./auth.route";
import device from "./device.route";
import pollutant from "./pollutant.route";

const router = (app: Express) => {
  //Allowing cross url requests
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

  // Use cookie-parser
  app.use(cookieParser());

  //To Parse JSON Objects
  app.use(express.json());

  // routes
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/device", device);
  app.use("/api/v1/pollutant", pollutant);

  //errorhandler
  app.use(useErrorHandler);
};

export default router;
