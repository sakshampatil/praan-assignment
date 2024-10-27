import jwt from "jsonwebtoken";
import * as errorHandler from "../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // get the token from the header if present
  let token: string | undefined = req.headers.authorization as string | undefined;

  // if no token found, throw error
  if (!token) {
    // throw new error.Unauthorized("Unauthorized");
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
    return;
  }

  try {
    if (token.includes("Bearer")) {
      token = token.substr(7);
    }

    // verifying token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    // Check if _id is present
    if (typeof decoded === "string" || !decoded._id) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
      return;
    }

    // Checking for existing user
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) {
      res.status(400).json({
        status: "error",
        message: "User does not exists",
      });
    }

    req.user = user;
    next();
  } catch (err: any) {
    // console.log("err", err);
    // next(new errorHandler.InsufficientAccessError("Insufficient Access"));
    res.status(403).json({
      status: "error",
      message: err,
    });
  }
};
