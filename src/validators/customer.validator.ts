import { body } from "express-validator";

export const customerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Customer name is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  body("notes")
    .optional(),
];