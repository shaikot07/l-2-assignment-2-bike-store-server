import express from 'express'
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import auth from '../../middlewares/auth';

const router =express.Router()


// api route here 

router.post('/create-order',OrderControllers.createOrder);
router.get('/get-user-order',auth(USER_ROLE.customer),OrderControllers.getUserOrders);
router.get("/revenue",OrderControllers.getRevenueData)



export const OrderRoutes= router;




