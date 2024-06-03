import "module-alias/register";
import "dotenv/config";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "@routes/authRoutes";
import accountRoutes from "@routes/accountRoutes";
import healthCheck from "@routes/healthCheck";
import { isAuthenticated } from "@middleware/authMiddleware";
import log from "@utils/logger";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      name?: string;
      email?: string;
      picture?: string;
    };
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
    },
  })
);

app.use("/oauth", authRoutes);
app.use("/account", isAuthenticated, accountRoutes);
app.use("/healthcheck", healthCheck);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => log.info(`Server running on port ${PORT}`));
