import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await createCustomer({
      businessId: req.businessId!,
      ...req.body,
    });

    return res.status(201).json(
      new ApiResponse(201, customer, "Customer created successfully")
    );
  }
);

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {
    const customers = await getCustomers(req.businessId!);

    return res.status(200).json(
      new ApiResponse(200, customers, "Customers fetched successfully")
    );
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const customerId = req.params.id;

    if (!customerId || Array.isArray(customerId)) {
      throw new ApiError(400, "Customer ID is required");
    }

    const customer = await getCustomerById(
      req.businessId!,
      customerId
    );

    return res.status(200).json(
      new ApiResponse(200, customer, "Customer fetched successfully")
    );
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const customerId = req.params.id;

    if (!customerId || Array.isArray(customerId)) {
      throw new ApiError(400, "Customer ID is required");
    }

    const customer = await updateCustomer(
      req.businessId!,
      customerId,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(200, customer, "Customer updated successfully")
    );
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const customerId = req.params.id;

    if (!customerId || Array.isArray(customerId)) {
      throw new ApiError(400, "Customer ID is required");
    }

    await deleteCustomer(req.businessId!, customerId);

    return res.status(200).json(
      new ApiResponse(200, null, "Customer deleted successfully")
    );
  }
);