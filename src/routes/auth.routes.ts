import { Router } from "express";
import { register , login, profile} from "../controllers/auth.controller.js";
import {
  registerValidation, loginValidation
} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get(
  "/profile",
  authMiddleware,
  profile
);

export default router;