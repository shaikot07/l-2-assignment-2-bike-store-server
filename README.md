# l-2-assignment-2-bike-store-server

## Project Overview

The **l-2-assignment-2-bike-store-server** is a comprehensive RESTful API designed to manage bike inventory. Built with **Node.js**, **Express**,**Mongoose**,and **Typescript**,.

---

## Features

### Bike  Management

- Add, update, delete, and retrieve Bike information.
- Handle Bike  details like brand, model, price, stock quantity, and category.

### Order Processing

- Place customer orders by selecting  Bike and specifying quantities.
- Validate the correctness of total price (price × quantity).
- Prevent orders for out-of-stock Bike.

### Revenue Calculation

- Calculate the total revenue generated from created orders.

### Data Validation

- validation by mongoose Schema  and it check it all incoming data are valid datatype.

---

## Technologies Used

- **Node.js**
- **Express**
- **Mongoose**
- **TypeScript**

---

## How to run the project locally

STEP 1: **Clone the Repository**

```bash
   git clone <repository-url>
   cd <repository-folder>
```

STEP 2: **Install all package which helps to run the project**

```
    npm install
```

STEP 3: **Create a .env file in the project root and add the following variables**

```
    PORT=5000
    DATABASE_URL=YOUR_DATABASE_URL

```

STEP 4: **Start the server with the following command**

```
    npm run dev

```

**The project should run on the port you set locally on your .env file.**

---

## API Endpoints

### Bikes

| Method | Endpoint        | Description                     |
| ------ | --------------- | ------------------------------- |
| GET    | `/api/products`     | Get all Bikes in the inventory   |
| POST   | `/api/products`     | Add a new Bike to the inventory  |
| GET    | `/api/products/:id` | Get details of a specific Bike   |
| PUT    | `/api/products/:id` | Update Bike details              |
| DELETE | `/api/products/:id` | Delete a Bike from the inventory |

---

### Orders

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/orders`         | Place a new order             |
| GET    | `/api/orders/revenue` | Get total revenue from orders |