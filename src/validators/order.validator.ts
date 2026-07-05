import { body } from "express-validator";

export const orderValidation = [
  body("customerId")
    .notEmpty()
    .withMessage("Customer ID is required"),

  body("products")
    .isArray({ min: 1 })
    .withMessage("Products are required"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required"),
];