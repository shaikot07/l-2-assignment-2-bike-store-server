import express from 'express'
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import auth from '../../middlewares/auth';

const router =express.Router()


// api route here 

router.post('/create-order',OrderControllers.createOrder);
router.delete('/:orderId',auth(USER_ROLE.customer),OrderControllers.cancelOrder);
router.get('/get-user-order',auth(USER_ROLE.customer),OrderControllers.getUserOrders);
router.get('/get-all-orders',OrderControllers.getAllOrders);
router.get('/:id',OrderControllers.getOrderById);
router.patch('/:orderId/status',auth(USER_ROLE.admin),OrderControllers.updateOrderStatus);
router.get("/revenue",OrderControllers.getRevenueData)



export const OrderRoutes= router;




