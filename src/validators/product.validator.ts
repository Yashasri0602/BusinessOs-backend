import { body } from "express-validator";

export const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("costPrice")
    .isFloat({ min: 0 })
    .withMessage("Cost price must be a positive number"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),

  body("lowStockAlert")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Low stock alert must be positive"),

  body("barcode")
    .optional()
    .isString(),

  body("supplier")
    .optional()
    .isString(),

  body("image")
    .optional()
    .isString(),
];