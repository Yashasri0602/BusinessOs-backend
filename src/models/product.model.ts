import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  lowStockAlert: number;
  barcode: string;
  supplier: string;
  image?: string;
}

const productSchema = new Schema<IProduct>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    lowStockAlert: {
      type: Number,
      default: 5,
    },

    barcode: {
      type: String,
      default: "",
    },

    supplier: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;