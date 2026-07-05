import { body } from "express-validator";

export const employeeValidation = [
  body("name")
    .notEmpty()
    .withMessage("Employee name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("role")
    .notEmpty()
    .withMessage("Role is required"),

  body("salary")
    .isFloat({ min: 0 })
    .withMessage("Salary must be greater than or equal to 0"),

  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required"),
];