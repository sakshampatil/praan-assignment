import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import router from "./routes";
import database from "./database";

const app: Express = express();
const Port = process.env.PORT || 3000;

//adding routes
router(app);

//connecting to databse
database.connect();

//Starting server
app.listen(Port, (err?: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${Port}`);
  }
});
