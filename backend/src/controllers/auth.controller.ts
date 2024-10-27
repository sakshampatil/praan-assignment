import { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseHandler } from "../middlewares/responseHandler";
import * as errorHandler from "../middlewares/errorHandler";

import { IUser, ISignupDTO, ILoginDTO } from "../types";
import helpers from "../helpers";
import deviceModel from "../model/device.model";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: ISignupDTO = req.body;

    //validationg body
    if (!body || !body.email || !body.password) {
      throw new errorHandler.BadRequest("Bad request");
    }

    // Checking for existing user
    const existingUser = await userModel.findOne({ email: body.email });

    if (existingUser) {
      throw new errorHandler.BadRequest("User already exist");
    }

    // Validating password length for security
    if (!body.password || body.password.length < 7) {
      throw new errorHandler.BadRequest("User already exist");
    }

    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;

    // Creating user using encrypted password
    const user = await userModel.create(body);

    const deviceBody = {
      userId: user._id,
      deviceNo: 1,
    };

    // Creating device
    const device = await deviceModel.create(deviceBody);

    //response body
    const resBody = {
      email: user.email,
    };

    return responseHandler(resBody, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: ILoginDTO = req.body;

    //validating body
    if (!body || !body.email || !body.password) {
      throw new errorHandler.BadRequest("Bad request");
    }

    //checking if user exists
    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      throw new errorHandler.BadRequest("User does not exist");
    }

    //comparing passwords
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      throw new errorHandler.BadRequest("Incorrect Password");
    }

    //generating jwt token
    const token = helpers.generateAccessToken(user._id, user.email);

    //generating refresh token
    const refreshtoken = helpers.generateRefreshToken(user._id, user.email);

    //creating a secure cookie
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //response body
    const resBody = {
      token: token,
      email: user.email,
    };

    responseHandler(resBody, res, "Login Successful");
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    const refreshtoken = cookies?.jwt;

    if (!refreshtoken) {
      throw new errorHandler.Unauthorized("Unauthorized");
    }

    // verifying token
    const decoded = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET as string);

    // Check if decoded is of type JwtPayload to safely access _id and email
    if (typeof decoded === "object" && decoded !== null && "email" in decoded && "_id" in decoded) {
      const _id = (decoded as JwtPayload)._id;
      const email = (decoded as JwtPayload).email;

      //checking if user exists
      const user = await userModel.findOne({ email: email });
      if (!user) {
        throw new errorHandler.BadRequest("User does not exist");
      }

      //generating jwt token
      const token = helpers.generateAccessToken(user._id, user.email);

      //response body
      const resBody = {
        token: token,
        email: user.email,
      };

      responseHandler(resBody, res, "Success");
    } else {
      throw new errorHandler.BadRequest("Invalid token payload");
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    responseHandler({}, res, "Cookie Cleared");
  } catch (err) {
    next(err);
  }
};
