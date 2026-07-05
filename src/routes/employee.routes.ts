import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { employeeValidation } from "../validators/employee.validator.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/employee.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  employeeValidation,
  validate,
  create
);

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getOne);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, remove);

export default router;