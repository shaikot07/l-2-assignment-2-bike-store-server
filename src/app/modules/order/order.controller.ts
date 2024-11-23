import { Request, Response } from 'express';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderInToDB(order);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      message: err.message || 'An unexpected error occurred',
      success: false,
      error: {
        name: err.name,
        message: err.message,
        // stack: err.stack,
        
      },
      stack: err.stack,
    });
  }
};
// get Revenue
const getRevenueData = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();
    res.status(200).json({
      message: 'revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({ message: "fail calculating revenue", status: false,error})
  }
};

export const OrderControllers = {
  createOrder,
  getRevenueData
};
