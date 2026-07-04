import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

interface ProductData {
  businessId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  lowStockAlert: number;
  barcode: string;
  supplier: string;
  image: string;
}

export const createProduct = async (
  data: ProductData
) => {
  const product = await Product.create(data);

  return product;
};

export const getProducts = async (businessId: string) => {
  return Product.find({ businessId });
};

export const getProductById = async (
  businessId: string,
  productId: string
) => {
  const product = await Product.findOne({
    _id: productId,
    businessId,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const updateProduct = async (
  businessId: string,
  productId: string,
  data: Partial<ProductData>
) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const deleteProduct = async (
  businessId: string,
  productId: string
) => {
  const product = await Product.findOneAndDelete({
    _id: productId,
    businessId,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};