import express from 'express'
import { OrderControllers } from './order.controller';

const router =express.Router()


// api route here 

router.post('/create-order',OrderControllers.createOrder);
router.get("/revenue",OrderControllers.getRevenueData)



export const OrderRoutes= router;




