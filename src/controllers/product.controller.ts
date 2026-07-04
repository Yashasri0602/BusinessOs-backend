import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../services/product.service.js";
import ApiError from "../utils/ApiError.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProduct({
      businessId: req.businessId!,
      ...req.body,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        product,
        "Product created successfully"
      )
    );
  }
);

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getProducts(req.businessId!);

    return res.status(200).json(
      new ApiResponse(
        200,
        products,
        "Products fetched successfully"
      )
    );
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId || Array.isArray(productId)) {
        throw new ApiError(400, "Product ID is required");
    }
    const product = await getProductById(
      req.businessId!,
      productId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        "Product fetched successfully"
      )
    );
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId || Array.isArray(productId)) {
      throw new ApiError(400, "Product ID is required");
    }

    const product = await updateProduct(
      req.businessId!,
      productId,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        "Product updated successfully"
      )
    );
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId || Array.isArray(productId)) {
      throw new ApiError(400, "Product ID is required");
    }

    await deleteProduct(
      req.businessId!,
      productId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Product deleted successfully"
      )
    );
  }
);