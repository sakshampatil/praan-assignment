import jwt from "jsonwebtoken";
import * as error from "../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // get the token from the header if present
  let token: string | undefined = req.headers.authorization as string | undefined;

  // if no token found, throw error
  if (!token) {
    throw new error.Unauthorized("Unauthorized");
  }

  try {
    if (token.includes("Bearer")) {
      token = token.substr(7);
    }
    console.log("token", token);
    // verifying token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    // Check if _id is present
    if (typeof decoded === "string" || !decoded._id) {
      throw new error.Unauthorized("Unauthorized");
    }

    // Checking for existing user
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) {
      throw new error.BadRequest("User doesnot exist");
    }

    req.user = user;
    next();
  } catch (err: any) {
    console.log("err", err);
    throw new error.InsufficientAccessError(err);
  }
};
