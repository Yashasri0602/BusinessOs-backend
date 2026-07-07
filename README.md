# 🚀 BusinessOS Backend

A scalable and secure REST API built with **Node.js, Express.js, TypeScript, MongoDB Atlas, and JWT Authentication** for managing business operations.

BusinessOS helps businesses manage products, customers, employees, expenses, and orders through a centralized backend with secure authentication and business-level data isolation.

---

## ✨ Features

### 🔐 Authentication
- Business Registration
- Business Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

### 📊 Dashboard
- Total Products
- Total Customers
- Total Orders
- Total Revenue
- Total Expenses
- Low Stock Products
- Recent Orders
- Inventory Status

### 📦 Product Management
- Create Product
- View Products
- View Product by ID
- Update Product
- Delete Product
- Low Stock Detection

### 👥 Customer Management
- Create Customer
- View Customers
- Update Customer
- Delete Customer

### 👨‍💼 Employee Management
- Create Employee
- View Employees
- Update Employee
- Delete Employee

### 💰 Expense Management
- Create Expense
- View Expenses
- Update Expense
- Delete Expense

### 🧠 Business Insights (via `@businessos/core`)
- Sales, Inventory, Expense, Employee & Customer Reports
- Revenue / Profit / Growth Analytics
- Plain-language Business & Inventory Summaries

### 🛒 Order Management
- Create Orders
- Verify Product Availability
- Automatic Stock Reduction
- Automatic Total Calculation
- View Orders
- Update Orders
- Delete Orders

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT (jsonwebtoken)
- bcrypt

## Validation
- express-validator

## Security
- Helmet
- CORS

## Logging
- Morgan

---

# 📁 Project Structure

```
src/
│
├── config/
│   └── database.ts
│
├── controllers/
│
├── integrations/
│   └── core.adapter.ts   ← translates Mongo docs <-> @businessos/core shapes
│
├── middlewares/
│
├── models/
│
├── routes/
│
├── services/
│
├── utils/
│
├── validators/
│
├── app.ts
│
└── server.ts
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/businessos-backend.git
```

Move into the project

```bash
cd businessos-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Run the server

```bash
npm run dev
```

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |
| GET | /auth/profile |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /dashboard |

---

## Products

| Method | Endpoint |
|---------|----------|
| POST | /products |
| GET | /products |
| GET | /products/:id |
| PUT | /products/:id |
| DELETE | /products/:id |

---

## Customers

| Method | Endpoint |
|---------|----------|
| POST | /customers |
| GET | /customers |
| GET | /customers/:id |
| PUT | /customers/:id |
| DELETE | /customers/:id |

---

## Employees

| Method | Endpoint |
|---------|----------|
| POST | /employees |
| GET | /employees |
| GET | /employees/:id |
| PUT | /employees/:id |
| DELETE | /employees/:id |

---

## Expenses

| Method | Endpoint |
|---------|----------|
| POST | /expenses |
| GET | /expenses |
| GET | /expenses/:id |
| PUT | /expenses/:id |
| DELETE | /expenses/:id |

---

## Orders

| Method | Endpoint |
|---------|----------|
| POST | /orders |
| GET | /orders |
| GET | /orders/:id |
| PUT | /orders/:id |
| DELETE | /orders/:id |

---

## Insights (powered by `@businessos/core`)

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /insights/reports | Sales, inventory, expense, employee, customer and finance reports |
| GET | /insights/summary | Plain-language business + inventory summaries |

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Business-level Data Isolation
- Request Validation
- Helmet Security Headers
- CORS Protection

---

# 📊 Database Collections

- Businesses
- Products
- Customers
- Employees
- Expenses
- Orders

---

# 🧠 Integration with `@businessos/core`

This backend depends on [`@businessos/core`](../business-core), a framework-agnostic
business-logic package ("the brain") that has no knowledge of Express or MongoDB.

```
Mongoose documents (MongoDB)
        │
        ▼
src/integrations/core.adapter.ts   ← translates Mongo docs to plain objects
        │
        ▼
@businessos/core (analytics / reports / ai)
        │
        ▼
src/services/insights.service.ts   ← calls core functions, returns JSON
        │
        ▼
/insights/reports and /insights/summary
```

- `core.adapter.ts` is the **only** file that knows about both shapes. It
  converts `IProduct`, `ICustomer`, `IEmployee`, `IExpense` and `IOrder`
  Mongoose documents into the plain `Product`, `Customer`, `Employee`,
  `Expense` and `Order` objects `@businessos/core` expects.
- `insights.service.ts` fetches this business's data from MongoDB, runs it
  through the adapter, then calls `@businessos/core`'s `reports` and `ai`
  modules directly — no logic is duplicated between the two projects.
- See the comment block at the top of `core.adapter.ts` for the known,
  intentional shape gaps between the two projects (free-text vs.
  enum fields, per-order vs. per-line pricing, and attendance history).
- `verify-integration.mjs` at the project root exercises the full
  adapter → `@businessos/core` pipeline with fixture data, with no
  database required — run it any time with `node verify-integration.mjs`
  after `npm run build` to sanity-check the wiring.

## Setup

```bash
# from the parent folder that contains both projects side by side:
#   businessos/
#     ├── business-core/
#     └── businessos-backend/

cd business-core && npm install && npm run build
cd ../businessos-backend && npm install   # picks up @businessos/core via the file: dependency
```

---

# 🌟 Future Enhancements

- Invoice Generation
- Email Notifications
- Inventory Forecasting
- Barcode Scanner Integration
- File Uploads
- Charts on top of the `/insights` data
- A real LLM call layered on top of `@businessos/core`'s `ai` module

---

# 👨‍💻 Author

**Yashasri**

Built as part of the **BusinessOS AI** project.
