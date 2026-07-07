/**
 * CORE ADAPTER
 * -------------------------------------------------------------------------
 * @businessos/core ("business-core") is a framework-agnostic package that
 * works with plain arrays of Product / Customer / Employee / Expense /
 * Order objects. This backend stores the same information as Mongoose
 * documents in MongoDB.
 *
 * This file is the ONLY place that translates between the two shapes, so
 * the rest of the backend never needs to know about business-core's
 * internal model format, and business-core never needs to know Mongoose
 * exists.
 *
 * Known shape gaps between the two projects (documented on purpose):
 *
 * 1. business-core's `category`, `role`, `paymentMethod` and order
 *    `status` fields are closed string-literal unions (e.g. Category is
 *    one of 10 fixed values). This backend stores those same fields as
 *    free-text strings, so a value a business owner typed in (e.g. a
 *    custom category name) may not be one of business-core's known
 *    values. We deliberately cast rather than reject, so real data never
 *    crashes analytics — but this means very "creative" category/role
 *    names won't be recognized by anything in business-core that
 *    branches on the literal value (nothing currently does).
 *
 * 2. business-core's `OrderProductLine.unitPrice` is meant to be "the
 *    price at the moment of sale". This backend's Order schema only
 *    stores `totalAmount` for the whole order, not a per-line price, so
 *    we fall back to the product's *current* price. If a product's price
 *    changes after the order was placed, historical analytics that rely
 *    on per-line pricing (top/worst sellers' revenue split) will use
 *    today's price, not the price actually charged. Storing
 *    `unitPrice` on each order line at creation time would close this
 *    gap — see order.service.ts.
 *
 * 3. business-core's Employee.attendance is a history array of dated
 *    records. This backend only stores the employee's *current*
 *    attendance status as a single string. We wrap it in a one-item
 *    array dated "today" so the shape lines up; it is not a real
 *    attendance history.
 */

import type {
  Product as CoreProduct,
  Customer as CoreCustomer,
  Employee as CoreEmployee,
  Expense as CoreExpense,
  Order as CoreOrder,
  OrderProductLine as CoreOrderLine,
  Category,
  Role,
  PaymentMethod,
  OrderStatusType,
} from "@businessos/core";

import type { IProduct } from "../models/product.model.js";
import type { ICustomer } from "../models/customer.model.js";
import type { IEmployee } from "../models/employee.model.js";
import type { IExpense } from "../models/expense.model.js";
import type { IOrder } from "../models/order.model.js";

// ---- small shared helpers -------------------------------------------------

const toIso = (value: unknown): string => {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return new Date().toISOString();
};

const idOf = (value: unknown): string => {
  if (value && typeof value === "object" && "_id" in (value as Record<string, unknown>)) {
    return String((value as { _id: unknown })._id);
  }
  return String(value);
};

// ---- Product ---------------------------------------------------------------

export function toCoreProduct(p: IProduct): CoreProduct {
  return {
    id: p._id.toString(),
    businessId: p.businessId.toString(),
    name: p.name,
    category: p.category as Category,
    barcode: p.barcode ?? "",
    costPrice: p.costPrice,
    sellingPrice: p.price,
    stock: p.stock,
    minimumStock: p.lowStockAlert,
    supplierId: p.supplier ?? "",
    createdAt: toIso((p as unknown as { createdAt?: Date }).createdAt),
  };
}

export const toCoreProducts = (products: IProduct[]): CoreProduct[] =>
  products.map(toCoreProduct);

// ---- Customer ---------------------------------------------------------------

export function toCoreCustomer(c: ICustomer): CoreCustomer {
  return {
    id: c._id.toString(),
    businessId: c.businessId.toString(),
    name: c.name,
    phone: c.phone,
    email: c.email,
    address: c.address ?? "",
    loyaltyPoints: 0, // not tracked by this backend yet
  };
}

export const toCoreCustomers = (customers: ICustomer[]): CoreCustomer[] =>
  customers.map(toCoreCustomer);

// ---- Employee ---------------------------------------------------------------

export function toCoreEmployee(e: IEmployee): CoreEmployee {
  return {
    id: e._id.toString(),
    businessId: e.businessId.toString(),
    name: e.name,
    role: e.role as Role,
    salary: e.salary,
    joiningDate: toIso(e.joiningDate),
    attendance: [
      {
        date: new Date().toISOString(),
        status: e.attendance as "Present" | "Absent" | "Leave" | "HalfDay",
      },
    ],
  };
}

export const toCoreEmployees = (employees: IEmployee[]): CoreEmployee[] =>
  employees.map(toCoreEmployee);

// ---- Expense ---------------------------------------------------------------

export function toCoreExpense(e: IExpense): CoreExpense {
  return {
    id: e._id.toString(),
    category: e.category as CoreExpense["category"],
    amount: e.amount,
    description: e.description ?? "",
    expenseDate: toIso(e.date),
  };
}

export const toCoreExpenses = (expenses: IExpense[]): CoreExpense[] =>
  expenses.map(toCoreExpense);

// ---- Order -------------------------------------------------------------------

function toCoreOrderLine(line: IOrder["products"][number]): CoreOrderLine {
  const populated = line.product as unknown;
  const unitPrice =
    populated && typeof populated === "object" && "price" in (populated as Record<string, unknown>)
      ? Number((populated as { price: unknown }).price)
      : 0;

  return {
    productId: idOf(line.product),
    quantity: line.quantity,
    unitPrice,
  };
}

export function toCoreOrder(o: IOrder): CoreOrder {
  return {
    id: o._id.toString(),
    customerId: idOf(o.customerId),
    products: o.products.map(toCoreOrderLine),
    total: o.totalAmount,
    paymentMethod: o.paymentMethod as PaymentMethod,
    status: o.status as OrderStatusType,
    orderDate: toIso(o.date),
  };
}

export const toCoreOrders = (orders: IOrder[]): CoreOrder[] => orders.map(toCoreOrder);
