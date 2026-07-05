import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

interface OrderData {
  businessId: string;
  customerId: string;
  products: {
    product: string;
    quantity: number;
  }[];
  paymentMethod: string;
}

export const createOrder = async (data: OrderData) => {

  let totalAmount = 0;

  for (const item of data.products) {

    const product = await Product.findOne({
      _id: item.product,
      businessId: data.businessId,
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `${product.name} is out of stock`
      );
    }

    totalAmount += product.price * item.quantity;

    product.stock -= item.quantity;

    await product.save();
  }

  const order = await Order.create({
    ...data,
    totalAmount,
  });

  return order;
};

export const getOrders = async (businessId: string) => {
  return Order.find({ businessId })
    .populate("customerId", "name email phone")
    .populate("products.product", "name price");
};

export const getOrderById = async (
  businessId: string,
  orderId: string
) => {
  const order = await Order.findOne({
    _id: orderId,
    businessId,
  })
    .populate("customerId", "name email phone")
    .populate("products.product", "name price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

export const updateOrder = async (
  businessId: string,
  orderId: string,
  data: {
    paymentMethod?: string;
    status?: string;
  }
) => {
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

export const deleteOrder = async (
  businessId: string,
  orderId: string
) => {
  const order = await Order.findOneAndDelete({
    _id: orderId,
    businessId,
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};