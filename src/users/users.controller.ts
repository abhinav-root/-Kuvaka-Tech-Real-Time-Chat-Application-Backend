import { Router } from "express";
const router = Router();
import { searchUsers } from "./users.service";
import { query } from "express-validator";
import validate from "../middlewares/validator.middeware";

router.get(
  "/",
  query("q").notEmpty().isString().isLength({ min: 1 }),
  validate,
  searchUsers
);

export default router;
