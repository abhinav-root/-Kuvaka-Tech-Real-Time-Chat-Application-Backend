import { Router } from "express";
const router = Router();
import { signup, login } from "./auth.service";
import { body } from "express-validator";
import validate from "../middlewares/validator.middeware";
import passport from "passport";

router.post(
  "/signup",
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 15 })
    .withMessage("Name cannot exceed 15 characters"),
  body("email")
    .notEmpty()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 50 })
    .withMessage("Password cannot be greater than 50 characters"),
  validate,
  signup
);

router.post("/login", passport.authenticate("local", {session: false}), login);

export default router;
