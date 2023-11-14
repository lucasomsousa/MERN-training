import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

type Error = {
  message: string;
  name: string;
  stack: Error[];
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  //eslint-disable-next-line no-console
  console.log(err.stack);

  const status = res.statusCode | 500;

  res.status(status);

  res.json({ message: err.message });

  next();
};

export default errorHandler;
