import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs, { promises as fsp } from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  const logsPath = path.join(__dirname, "..", "logs");

  try {
    if (!fs.existsSync(logsPath)) {
      await fsp.mkdir(logsPath);
    }
    await fsp.appendFile(path.join(logsPath, logFileName), logItem);
  } catch (err) {
    //eslint-disable-next-line no-console
    console.log(err);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`);
  //eslint-disable-next-line no-console
  console.log(`${req.method} ${req.path}`);
  next();
};
