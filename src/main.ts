import dotenv from "dotenv";
dotenv.config();
import { app, express, httpServer } from "./socketio";
import helmet from "helmet";
import cors from "cors";
import connectMongoDB from "./mongo";
connectMongoDB();
import usersController from "./users/users.controller"

// global middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use("/auth", usersController)

const port = process.env.PORT;
httpServer.listen(port, () =>
  console.log(`Express server listening on port ${port}`)
);
