import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const customerSchema = new Schema<ICustomer>(
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

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model<ICustomer>(
  "Customer",
  customerSchema
);

export default Customer;