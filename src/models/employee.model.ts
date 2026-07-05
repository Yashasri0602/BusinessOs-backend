import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  joiningDate: Date;
  attendance: string;
}

const employeeSchema = new Schema<IEmployee>(
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

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    attendance: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>(
  "Employee",
  employeeSchema
);

export default Employee;