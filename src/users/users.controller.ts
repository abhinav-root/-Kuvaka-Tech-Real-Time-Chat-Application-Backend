import { Router } from "express";
const router = Router();
import {
  addFriend,
  getAllFriends,
  removeFriend,
  searchUsers,
} from "./users.service";
import { body, param, query } from "express-validator";
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

router.post(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  body("friendId").isMongoId(),
  validate,
  addFriend
);

router.delete(
  "/friends/:friendId",
  passport.authenticate("jwt", { session: false }),
  param("friendId").isMongoId(),
  validate,
  removeFriend
);

export default router;
