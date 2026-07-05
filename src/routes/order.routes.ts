import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { orderValidation } from "../validators/order.validator.js";
import { create,  getAll,
  getOne,
  update,
  remove } from "../controllers/order.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  orderValidation,
  validate,
  create
);

router.get(
  "/",
  authMiddleware,
  getAll
);

router.get(
  "/:id",
  authMiddleware,
  getOne
);

router.put(
  "/:id",
  authMiddleware,
  update
);

router.delete(
  "/:id",
  authMiddleware,
  remove
);

export default router;