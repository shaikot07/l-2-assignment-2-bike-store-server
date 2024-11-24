# 🚴‍♂️ Bike Store Server - Assignment 2

## 📋 Project Overview

The **Bike Store Server** is a robust RESTful API built with **Node.js**, **Express**, **Mongoose**, and **TypeScript**. It is designed to efficiently manage bike inventory, orders, and revenue.

---

## ✨ Features

### 1. **Bike Management** 🚲
- ➕ Add, 🛠️ update, ❌ delete, and 🔍 retrieve bike details.
- Manage attributes such as 🏷️ brand, 📋 model, 💰 price, 📦 stock quantity, and 🗂️ category.

### 2. **Order Processing** 🛒
- 📦 Place customer orders by selecting bikes and specifying quantities.
- ✅ Automatically validate total price (💲price × 🔢 quantity).
- 🚫 Prevent orders for bikes that are out of stock.

### 3. **Revenue Calculation** 💵
- 📈 Compute the total revenue from completed orders.

### 4. **Data Validation** ✔️
- Ensure the validity of all incoming data using **Mongoose** schemas.

---

## 🛠️ Technologies Used
- **Node.js** 🟩
- **Express** 🚀
- **Mongoose** 📚
- **TypeScript** 📝

---

## 🖥️ Running the Project Locally

### Step 1: Clone the Repository 🗂️
Run the following commands in your terminal:
git clone <repository-url>
cd <repository-folder>

---
### Step 2: Install Dependencies 📦
Install the required packages with:
npm install
---

### Step 3: Configure Environment Variables ⚙️
Create a .env file in the root directory and add the following configuration:


PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

---
### Step 4: Start the Server 🚀
Start the development server with:

npm run dev
The server will run on the port specified in your .env file.


## 📡 API Endpoints

### 1. **Bikes** 🚲

| 🛠️ Action        | 📍 Endpoint          | 📋 Description                           |
|-------------------|---------------------|------------------------------------------|
| 📥 **GET**       | `/api/products`     | Retrieve all bikes in inventory          |
| ➕ **POST**      | `/api/products`     | Add a new bike to the inventory          |
| 🔍 **GET**       | `/api/products/:id` | Retrieve details of a specific bike      |
| 🛠️ **PUT**       | `/api/products/:id` | Update details of a specific bike        |
| ❌ **DELETE**    | `/api/products/:id` | Remove a bike from the inventory         |

### 2. **Orders** 🛒

| 🛠️ Method   | 📍 Endpoint          | 📋 Description                           |
|-------------|---------------------|------------------------------------------|
| ➕ **POST** | `/api/orders`       | Place a new order                        |
| 📊 **GET**  | `/api/orders/revenue` | Retrieve total revenue from all orders   |



## 🖊️ **Credits**

Developed with ❤️ by:  
**[Saiful Islam Shaikot](#)** 🎉
