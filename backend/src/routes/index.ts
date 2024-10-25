import express, { Express, Request, Response, NextFunction } from "express";
import { useErrorHandler } from "../middlewares/errorHandler";
import cors from "cors";

const Router = (app: Express) => {
  //Allowing cross url requests
  app.use(cors());

  //To Parse JSON Objects
  app.use(express.json());

  //errorhandler
  app.use(useErrorHandler);
};

export default Router;
