import { Request, Response, NextFunction } from "express";
import { registerBusiness } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { loginBusiness } from "../services/auth.service.js";
import { getBusinessProfile } from "../services/auth.service.js";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await registerBusiness(req.body);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          result,
          "Business registered successfully"
        )
      );
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("BODY RECEIVED:");
    console.log(req.body);

    const { email, password } = req.body;

    const result = await loginBusiness(email, password);

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Login successful"
      )
    );
  }
);

export const profile = asyncHandler(
  async (req: Request, res: Response) => {
    const business = await getBusinessProfile(req.businessId!);

    return res.status(200).json(
      new ApiResponse(
        200,
        business,
        "Profile fetched successfully"
      )
    );
  }
);