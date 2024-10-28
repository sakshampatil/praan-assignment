import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import router from "./routes";
import database from "./database";
import publisher from "./mqtt/publisher";
import subscriber from "./mqtt/subscriber";
import cors from "cors";

const app: Express = express();
const Port = process.env.PORT || 3000;

//adding routes
router(app);

//connecting to databse
database.connect();

//connecting publisher to broker
publisher.publish();

//connecting subscriber to broker
subscriber.subscribe();

//Starting server
app.listen(Port, (err?: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${Port}`);
  }
});
