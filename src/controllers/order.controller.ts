import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createOrder, getOrders,
  getOrderById,
  updateOrder,
  deleteOrder, } from "../services/order.service.js";
import ApiError from "../utils/ApiError.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await createOrder({
      businessId: req.businessId!,
      ...req.body,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        order,
        "Order created successfully"
      )
    );
  }
);

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrders(req.businessId!);

    return res.status(200).json(
      new ApiResponse(200, orders, "Orders fetched successfully")
    );
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.id;

    if (!orderId || Array.isArray(orderId)) {
      throw new ApiError(400, "Order ID is required");
    }

    const order = await getOrderById(
      req.businessId!,
      orderId
    );

    return res.status(200).json(
      new ApiResponse(200, order, "Order fetched successfully")
    );
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.id;

    if (!orderId || Array.isArray(orderId)) {
      throw new ApiError(400, "Order ID is required");
    }

    const order = await updateOrder(
      req.businessId!,
      orderId,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(200, order, "Order updated successfully")
    );
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.id;

    if (!orderId || Array.isArray(orderId)) {
      throw new ApiError(400, "Order ID is required");
    }

    await deleteOrder(
      req.businessId!,
      orderId
    );

    return res.status(200).json(
      new ApiResponse(200, null, "Order deleted successfully")
    );
  }
);