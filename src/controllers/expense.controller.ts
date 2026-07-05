import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../services/expense.service.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const expense = await createExpense({
      businessId: req.businessId!,
      ...req.body,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        expense,
        "Expense created successfully"
      )
    );
  }
);

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {
    const expenses = await getExpenses(req.businessId!);

    return res.status(200).json(
      new ApiResponse(
        200,
        expenses,
        "Expenses fetched successfully"
      )
    );
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const expenseId = req.params.id;

    if (!expenseId || Array.isArray(expenseId)) {
      throw new ApiError(400, "Expense ID is required");
    }

    const expense = await getExpenseById(
      req.businessId!,
      expenseId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        expense,
        "Expense fetched successfully"
      )
    );
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const expenseId = req.params.id;

    if (!expenseId || Array.isArray(expenseId)) {
      throw new ApiError(400, "Expense ID is required");
    }

    const expense = await updateExpense(
      req.businessId!,
      expenseId,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        expense,
        "Expense updated successfully"
      )
    );
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const expenseId = req.params.id;

    if (!expenseId || Array.isArray(expenseId)) {
      throw new ApiError(400, "Expense ID is required");
    }

    await deleteExpense(
      req.businessId!,
      expenseId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Expense deleted successfully"
      )
    );
  }
);