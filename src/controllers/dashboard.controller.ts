import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const dashboard = await getDashboardData(req.businessId!);

    return res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "Dashboard data fetched successfully"
      )
    );
  }
);