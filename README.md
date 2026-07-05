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

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

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

# 🌟 Future Enhancements

- AI Business Insights
- Sales Analytics
- Invoice Generation
- Email Notifications
- Inventory Forecasting
- Employee Attendance
- Barcode Scanner Integration
- File Uploads
- Reports & Charts

---

# 👨‍💻 Author

**Yashasri**

Built as part of the **BusinessOS AI** project.
