import Expense from "../models/expense.model.js";
import ApiError from "../utils/ApiError.js";

interface ExpenseData {
  businessId: string;
  title: string;
  category: string;
  amount: number;
  date: Date;
  description?: string;
}

export const createExpense = async (data: ExpenseData) => {
  return Expense.create(data);
};

export const getExpenses = async (businessId: string) => {
  return Expense.find({ businessId });
};

export const getExpenseById = async (
  businessId: string,
  expenseId: string
) => {
  const expense = await Expense.findOne({
    _id: expenseId,
    businessId,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  return expense;
};

export const updateExpense = async (
  businessId: string,
  expenseId: string,
  data: Partial<ExpenseData>
) => {
  const expense = await Expense.findOneAndUpdate(
    {
      _id: expenseId,
      businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  return expense;
};

export const deleteExpense = async (
  businessId: string,
  expenseId: string
) => {
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    businessId,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  return expense;
};