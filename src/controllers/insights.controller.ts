import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getFullReports, getBusinessInsights } from "../services/insights.service.js";

export const reports = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getFullReports(req.businessId!);

    return res.status(200).json(
      new ApiResponse(200, data, "Reports generated successfully")
    );
  }
);

export const summary = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getBusinessInsights(req.businessId!);

    return res.status(200).json(
      new ApiResponse(200, data, "Business summary generated successfully")
    );
  }
);
