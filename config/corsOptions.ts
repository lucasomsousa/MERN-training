import { allowedOrigins } from "./allowedOrigins";

import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      callback(new Error("Request not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
