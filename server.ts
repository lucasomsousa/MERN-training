import express, { Express } from "express";
import path from "path";

import { logger } from "./middleware/logger";
import { router } from "./routes/root";
import { corsOptions } from "./config/corsOptions";

import errorHandler from "./middleware/errorHandler";

import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3500;

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

//eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
