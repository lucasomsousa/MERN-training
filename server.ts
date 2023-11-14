import express, { Express } from "express";
import path from "path";

import { router } from "./routes/root";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3500;

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

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
