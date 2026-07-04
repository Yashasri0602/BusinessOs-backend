import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  businessId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  amount: number;
  date: Date;
  description: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model<IExpense>(
  "Expense",
  expenseSchema
);

export default Expense;