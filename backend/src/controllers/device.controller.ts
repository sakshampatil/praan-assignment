import { Request, Response, NextFunction } from "express";
import deviceModel from "../model/device.model";
import { responseHandler } from "../middlewares/responseHandler";
import * as errorHandler from "../middlewares/errorHandler";
import userModel from "../model/user.model";

//creating device
export const createDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const deviceBody = {
      userId: user._id,
      deviceNo: user.devices + 1,
    };

    // Creating device
    const device = await deviceModel.create(deviceBody);

    //updating user
    const updatedUser = await userModel.updateOne({ _id: user._id }, { $inc: { devices: 1 } });

    return responseHandler({}, res, "Device created successfully");
  } catch (err) {
    next(err);
  }
};

//update device
export const updateDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;
    const body = req.body;

    // Checking if device exists
    const device = await deviceModel.findOne({ _id: deviceId });

    if (!device) {
      throw new errorHandler.BadRequest("Device doesnot exist");
    }

    // Updating device
    const updatedDevice = await deviceModel.updateOne({ _id: device._id }, { $set: { ...body } });

    return responseHandler({}, res, "Device updated successfully");
  } catch (err) {
    next(err);
  }
};

//list devices
export const listDevices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    // fetching devices list
    const devices = await deviceModel.find({ userId: user._id });

    return responseHandler({ devices }, res);
  } catch (err) {
    next(err);
  }
};

//delete device
export const deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;

    // Checking if device exists
    const device = await deviceModel.findOne({ _id: deviceId });

    if (!device) {
      throw new errorHandler.BadRequest("Device doesnot exist");
    }

    // Deleteing device
    const updatedDevice = await deviceModel.deleteOne({ _id: device._id });

    return responseHandler({}, res, "Device deleteted successfully");
  } catch (err) {
    next(err);
  }
};
