import { Router } from "express";
import { signup } from "./users.service";
const router = Router();

router.post("/signup", signup);

export default router;
