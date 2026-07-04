import { body } from "express-validator";

export const registerValidation = [
  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("Business name is required"),

  body("ownerName")
    .trim()
    .notEmpty()
    .withMessage("Owner name is required"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("industry")
    .trim()
    .notEmpty()
    .withMessage("Industry is required"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];