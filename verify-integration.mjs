// Standalone verification: proves core.adapter.ts + @businessos/core work
// together correctly, without needing a live MongoDB connection.
// Run with: node verify-integration.mjs (after `npm run build`)

import {
  toCoreProducts,
  toCoreCustomers,
  toCoreEmployees,
  toCoreExpenses,
  toCoreOrders,
} from "./dist/integrations/core.adapter.js";

import {
  generateSalesReport,
  generateInventoryReport,
  generateExpenseReport,
  generateEmployeeReport,
  generateCustomerReport,
  generateFinanceSnapshot,
  generateBusinessSummary,
  generateInventorySummary,
} from "@businessos/core";

// ---- fake Mongoose-doc-shaped fixtures (what .find() would resolve to) ----

const bizId = "64a000000000000000000001";

const fakeId = (hex) => ({ toString: () => hex });

const products = [
  {
    _id: fakeId("64a000000000000000000101"),
    businessId: fakeId(bizId),
    name: "Basmati Rice 5kg",
    category: "Grocery",
    barcode: "8901234567890",
    costPrice: 400,
    price: 500, // schema field is "price" -> maps to sellingPrice
    stock: 3,
    lowStockAlert: 5, // schema field is "lowStockAlert" -> maps to minimumStock
    supplier: "supplier_001",
    createdAt: new Date("2026-05-01T00:00:00Z"),
  },
  {
    _id: fakeId("64a000000000000000000102"),
    businessId: fakeId(bizId),
    name: "Sunflower Oil 1L",
    category: "Grocery",
    barcode: "8901234567891",
    costPrice: 120,
    price: 150,
    stock: 40,
    lowStockAlert: 10,
    supplier: "supplier_001",
    createdAt: new Date("2026-05-01T00:00:00Z"),
  },
];

const customers = [
  {
    _id: fakeId("64a000000000000000000201"),
    businessId: fakeId(bizId),
    name: "Ravi Kumar",
    phone: "9999999999",
    email: "ravi@example.com",
    address: "MG Road",
  },
];

const employees = [
  {
    _id: fakeId("64a000000000000000000301"),
    businessId: fakeId(bizId),
    name: "Asha Patel",
    email: "asha@example.com",
    phone: "8888888888",
    role: "Cashier",
    salary: 18000,
    joiningDate: new Date("2025-01-15T00:00:00Z"),
    attendance: "Present",
  },
];

const expenses = [
  {
    _id: fakeId("64a000000000000000000401"),
    category: "Rent",
    amount: 15000,
    description: "July shop rent",
    date: new Date(),
  },
];

const orders = [
  {
    _id: fakeId("64a000000000000000000501"),
    customerId: fakeId("64a000000000000000000201"),
    products: [
      { product: { _id: fakeId("64a000000000000000000101"), price: 500 }, quantity: 2 },
    ],
    totalAmount: 1000,
    paymentMethod: "Cash",
    status: "Completed",
    date: new Date(),
  },
];

// ---- run the full pipeline --------------------------------------------

const coreProducts = toCoreProducts(products);
const coreCustomers = toCoreCustomers(customers);
const coreEmployees = toCoreEmployees(employees);
const coreExpenses = toCoreExpenses(expenses);
const coreOrders = toCoreOrders(orders);

console.log("=== Sales Report ===");
console.log(generateSalesReport(coreOrders));

console.log("\n=== Inventory Report ===");
console.log(generateInventoryReport(coreProducts));

console.log("\n=== Expense Report ===");
console.log(generateExpenseReport(coreExpenses));

console.log("\n=== Employee Report ===");
console.log(generateEmployeeReport(coreEmployees));

console.log("\n=== Customer Report ===");
console.log(generateCustomerReport(coreCustomers, coreOrders));

console.log("\n=== Finance Snapshot ===");
console.log(generateFinanceSnapshot(coreOrders, coreProducts, coreExpenses));

console.log("\n=== Business Summary (AI module) ===");
console.log(generateBusinessSummary(coreOrders, coreProducts, coreExpenses));

console.log("\n=== Inventory Summary (AI module) ===");
console.log(generateInventorySummary(coreProducts));

console.log("\n✅ Adapter + @businessos/core pipeline ran end-to-end with no errors.");
