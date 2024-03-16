import dotenv from "dotenv";
dotenv.config();
import { app, express, httpServer } from "./socketio";
import helmet from "helmet";
import cors from "cors";
import connectMongoDB from "./mongo";
connectMongoDB();
import authController from "./auth/auth.controller";
import passport from "passport";
import "./auth/strategies/passport-local.strategy"
import "./auth/strategies/passport-jwt.strategy"

// global middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

// routes
app.use("/auth", authController);

const port = process.env.PORT;
httpServer.listen(port, () =>
  console.log(`Express server listening on port ${port}`)
);
