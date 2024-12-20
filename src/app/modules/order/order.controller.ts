import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderInToDB(order);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // console.log(err);
    // res.status(400).json({
    //   message: err.message || 'An unexpected error occurred',
    //   success: false,
    //   error: {
    //     name: err.name,
    //     message: err.message,
    //     // stack: err.stack,
    //   },
    //   stack: err.stack,
    // });
    next(error);
  }
};
// get Revenue
const getRevenueData = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();
    
    res.status(200).json({
      message: 'revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    // res.status(500).json({ message: 'fail calculating revenue', status: false, error });
    next(error)
  }
};

export const OrderControllers = {
  createOrder,
  getRevenueData,
};
