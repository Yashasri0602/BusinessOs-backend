import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  businessId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  date: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>(
  "Order",
  orderSchema
);

export default Order;