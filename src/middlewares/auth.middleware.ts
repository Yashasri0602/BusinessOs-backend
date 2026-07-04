import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import ApiError from "../utils/ApiError.js";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      businessId?: string;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.businessId = decoded.id;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default authMiddleware;