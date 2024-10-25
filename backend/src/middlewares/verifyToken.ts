import jwt from "jsonwebtoken";
import * as error from "../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined = req.headers.authorization?.split(" ")[2] as string | undefined;

  // checking for token
  if (!token) {
    throw new error.Unauthorized("Unauthorized");
  }

  try {
    // verifying token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (err: any) {
    throw new error.Unauthorized(err);
  }
};
