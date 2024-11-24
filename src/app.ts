// const express = require('express')
import express, { Application,  NextFunction,  Request, Response } from 'express';
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
  res.send('its ready to be get API end point services !!');
});

// global error handler 
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('global error handler:', error);
  // send a response with the error details
  res.status(error.status || 500).json({
    success: error.success !== undefined ? error.success : false,
    message: error.message || 'something went wrong',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
});
export default app;
