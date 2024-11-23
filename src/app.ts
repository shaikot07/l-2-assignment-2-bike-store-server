// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/order/order.router';
const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Its ready to be get API end point services !!');
});


export default app;
