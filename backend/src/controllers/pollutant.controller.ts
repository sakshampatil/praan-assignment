import { Request, Response, NextFunction } from "express";
import pollutantModel from "../model/pollutant.model";
import { responseHandler } from "../middlewares/responseHandler";
import * as errorHandler from "../middlewares/errorHandler";
import deviceModel from "../model/device.model";
import { timeStamp } from "console";
import mongoose from "mongoose";

//creating pollutant
export const createPollutant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    //checking if device exists
    const device = await deviceModel.findById(body.deviceId);

    if (!device) {
      throw new errorHandler.BadRequest("Device doesnot exists");
    }

    const pollutantBody = {
      ...body,
      timeStamp: new Date(),
    };

    // Creating pollutant
    const pollutant = await deviceModel.create(pollutantBody);

    return responseHandler({}, res);
  } catch (err) {
    next(err);
  }
};

//list pollutant
export const listPollutant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;
    let { date } = req.query;
    let requiredDate;
    console.log("date", date);
    if (!date) {
      requiredDate = new Date();
    } else {
      console.log("here");
      requiredDate = new Date(String(date));
      console.log("requiredDate", requiredDate);
    }

    console.log("deviceId", new mongoose.Types.ObjectId(deviceId));

    //checking if device exists
    const device = await deviceModel.findOne({ _id: deviceId });

    if (!device) {
      throw new errorHandler.BadRequest("Device doesnot exists");
    }

    // Create separate start and end of day timestamps for the query
    const startOfDay = new Date(requiredDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    console.log("startOfDay", startOfDay);

    const endOfDay = new Date(requiredDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Listing pollutant
    // const pollutant = await pollutantModel.find({
    //   deviceId: deviceId,
    //   timestamp: { $gte: startOfDay, $lte: endOfDay },
    // });

    const pollutants = await pollutantModel.aggregate([
      {
        $match: {
          deviceId: new mongoose.Types.ObjectId(deviceId),
          timestamp: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%H:00", date: "$timestamp" },
          },
          p1: { $avg: "$p1" },
          p25: { $avg: "$p25" },
          p10: { $avg: "$p10" },
        },
      },
      {
        $project: {
          time: "$_id",
          p1: 1,
          p25: 1,
          p10: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          time: 1, // Sort by hour
        },
      },
    ]);

    return responseHandler(pollutants, res);
  } catch (err) {
    next(err);
  }
};

export const getAvgPollutant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;
    let { date } = req.query;
    let requiredDate;
    console.log("date", date);
    if (!date) {
      requiredDate = new Date();
    } else {
      console.log("here");
      requiredDate = new Date(String(date));
    }

    console.log("deviceId", new mongoose.Types.ObjectId(deviceId));

    //checking if device exists
    const device = await deviceModel.findOne({ _id: deviceId });

    if (!device) {
      throw new errorHandler.BadRequest("Device doesnot exists");
    }

    // Create separate start and end of day timestamps for the query
    const startOfDay = new Date(requiredDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(requiredDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const pollutants = await pollutantModel.aggregate([
      {
        $match: {
          deviceId: new mongoose.Types.ObjectId(deviceId),
          timestamp: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          avgP1: { $avg: "$p1" },
          avgP25: { $avg: "$p25" },
          avgP10: { $avg: "$p10" },
        },
      },
      {
        $project: {
          p1: { $ceil: "$avgP1" },
          p25: { $ceil: "$avgP25" },
          p10: { $ceil: "$avgP10" },
          _id: 0,
        },
      },
    ]);

    console.log("pollutants", pollutants);

    return responseHandler(pollutants[0], res);
  } catch (err) {
    next(err);
  }
};
