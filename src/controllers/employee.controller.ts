import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.service.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await createEmployee({
      businessId: req.businessId!,
      ...req.body,
    });

    return res.status(201).json(
      new ApiResponse(201, employee, "Employee created successfully")
    );
  }
);

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {
    const employees = await getEmployees(req.businessId!);

    return res.status(200).json(
      new ApiResponse(200, employees, "Employees fetched successfully")
    );
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const employeeId = req.params.id;

    if (!employeeId || Array.isArray(employeeId)) {
      throw new ApiError(400, "Employee ID is required");
    }

    const employee = await getEmployeeById(
      req.businessId!,
      employeeId
    );

    return res.status(200).json(
      new ApiResponse(200, employee, "Employee fetched successfully")
    );
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const employeeId = req.params.id;

    if (!employeeId || Array.isArray(employeeId)) {
      throw new ApiError(400, "Employee ID is required");
    }

    const employee = await updateEmployee(
      req.businessId!,
      employeeId,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(200, employee, "Employee updated successfully")
    );
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const employeeId = req.params.id;

    if (!employeeId || Array.isArray(employeeId)) {
      throw new ApiError(400, "Employee ID is required");
    }

    await deleteEmployee(req.businessId!, employeeId);

    return res.status(200).json(
      new ApiResponse(200, null, "Employee deleted successfully")
    );
  }
);