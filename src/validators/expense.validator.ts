import { body } from "express-validator";

export const expenseValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than or equal to 0"),

  body("date")
    .notEmpty()
    .withMessage("Date is required"),

  body("description")
    .optional(),
];