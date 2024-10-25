import mongoose from "mongoose";
import "dotenv/config";

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      console.log("Connected To mongodb");
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const database = { connect };

export default database;
