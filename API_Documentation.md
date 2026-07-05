# 📘 BusinessOS Backend API Documentation

## Overview

BusinessOS Backend is a RESTful API built using **Node.js, Express.js, TypeScript, and MongoDB Atlas**. It provides secure authentication and business management functionalities, including Products, Customers, Employees, Expenses, Orders, and Dashboard analytics.

**Base URL**

```
http://localhost:5000
```

---

# Authentication

## Register Business

**Endpoint**

```
POST /auth/register
```

**Request Body**

```json
{
  "businessName": "BusinessOS",
  "ownerName": "Yash",
  "email": "test@example.com",
  "password": "123456",
  "phone": "9876543210",
  "industry": "Technology",
  "address": "Hyderabad"
}
```

**Response**

```json
{
  "success": true,
  "message": "Business registered successfully",
  "data": {
    "business": {},
    "token": "JWT_TOKEN"
  }
}
```

---

## Login

**Endpoint**

```
POST /auth/login
```

**Request Body**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

## Get Profile

**Endpoint**

```
GET /auth/profile
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
```

---

# Dashboard

## Get Dashboard Data

**Endpoint**

```
GET /dashboard
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
```

**Returns**

- Total Products
- Total Customers
- Total Orders
- Total Revenue
- Total Expenses
- Low Stock Products
- Inventory Status
- Recent Orders

---

# Products

## Create Product

```
POST /products
```

**Body**

```json
{
  "name": "MacBook Pro",
  "category": "Laptop",
  "description": "M4 Pro",
  "price": 180000,
  "costPrice": 160000,
  "stock": 15,
  "lowStockAlert": 3,
  "barcode": "123456789",
  "supplier": "Apple",
  "image": ""
}
```

---

## Get All Products

```
GET /products
```

---

## Get Product by ID

```
GET /products/:id
```

---

## Update Product

```
PUT /products/:id
```

---

## Delete Product

```
DELETE /products/:id
```

---

# Customers

## Create Customer

```
POST /customers
```

**Body**

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "Hyderabad",
  "notes": "Regular customer"
}
```

---

## Get All Customers

```
GET /customers
```

---

## Get Customer by ID

```
GET /customers/:id
```

---

## Update Customer

```
PUT /customers/:id
```

---

## Delete Customer

```
DELETE /customers/:id
```

---

# Employees

## Create Employee

```
POST /employees
```

**Body**

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "role": "Sales Manager",
  "salary": 50000,
  "joiningDate": "2026-07-05"
}
```

---

## Get All Employees

```
GET /employees
```

---

## Get Employee by ID

```
GET /employees/:id
```

---

## Update Employee

```
PUT /employees/:id
```

---

## Delete Employee

```
DELETE /employees/:id
```

---

# Expenses

## Create Expense

```
POST /expenses
```

**Body**

```json
{
  "title": "Office Rent",
  "category": "Rent",
  "amount": 25000,
  "date": "2026-07-05",
  "description": "Monthly office rent"
}
```

---

## Get All Expenses

```
GET /expenses
```

---

## Get Expense by ID

```
GET /expenses/:id
```

---

## Update Expense

```
PUT /expenses/:id
```

---

## Delete Expense

```
DELETE /expenses/:id
```

---

# Orders

## Create Order

```
POST /orders
```

**Body**

```json
{
  "customerId": "CUSTOMER_ID",
  "products": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2
    }
  ],
  "paymentMethod": "Cash"
}
```

### Business Logic

When an order is created:

- Products are verified.
- Available stock is checked.
- Product stock is automatically reduced.
- Total order amount is calculated.
- Order is stored in the database.

---

## Get All Orders

```
GET /orders
```

---

## Get Order by ID

```
GET /orders/:id
```

---

## Update Order

```
PUT /orders/:id
```

---

## Delete Order

```
DELETE /orders/:id
```

---

# Authentication

All protected endpoints require:

```
Authorization: Bearer JWT_TOKEN
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|404|Not Found|
|500|Internal Server Error|

---

# Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Helmet
- CORS
- Morgan
- Express Validator

---

# Project Architecture

```
Request
    │
Routes
    │
Validation
    │
Controller
    │
Service
    │
Model
    │
MongoDB Atlas
```

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Business-Level Data Isolation
- Protected Routes
- Input Validation
- Helmet Security Headers
- CORS Configuration

---

# Future Enhancements

- AI Business Insights
- Monthly Revenue Analytics
- Employee Attendance Tracking
- Invoice Generation
- Inventory Forecasting
- Barcode Scanner Integration
- File Upload Support
- Email Notifications

---

# Author

**Yashasri**

BusinessOS Backend v1