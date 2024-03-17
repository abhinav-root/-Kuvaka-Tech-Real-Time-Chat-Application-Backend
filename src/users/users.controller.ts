import { Router } from "express";
const router = Router();
import { getAllFriends, searchUsers } from "./users.service";
import { query } from "express-validator";
import validate from "../middlewares/validator.middeware";
import passport from "passport";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  query("q").notEmpty().isString().isLength({ min: 1 }),
  validate,
  searchUsers
);

router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  getAllFriends
);

export default router;
