import express, { Express, Request, Response, NextFunction } from "express";
import { useErrorHandler } from "../middlewares/errorHandler";
import cors from "cors";
import auth from "./auth.route";
import cookieParser from "cookie-parser";

const router = (app: Express) => {
  //Allowing cross url requests
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  // Use cookie-parser
  app.use(cookieParser());

  //To Parse JSON Objects
  app.use(express.json());

  // routes
  app.use("/api/v1/auth", auth);

  //errorhandler
  app.use(useErrorHandler);
};

export default router;
