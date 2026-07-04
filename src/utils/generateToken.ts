import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateToken = (businessId: string): string => {
  return jwt.sign(
    { id: businessId },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;