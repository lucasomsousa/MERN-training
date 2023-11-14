import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express, { Express } from "express";

import { AppDataSource } from "./data-source";
import { logger, logEvents } from "./middleware/logger";
import { router } from "./routes/root";
import { corsOptions } from "./config/corsOptions";

import errorHandler from "./middleware/errorHandler";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3500;

// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", router);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Page Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    //eslint-disable-next-line no-console
    console.log("Data Source has been initialized!");
    //eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    //eslint-disable-next-line no-console
    console.error("Error during Data Source initialization", err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });
