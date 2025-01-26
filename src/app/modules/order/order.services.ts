import mongoose from "mongoose";
import { ProductModel } from '../products/product.model';
import { OrderModel } from './order.model';
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const createOrderInToDB = async (orderData:any) => {
//   const { email, product, quantity, totalPrice } = orderData;
//   const productData = await ProductModel.findById(product);

//   if (!productData) {
//     throw new Error('product not found');
//   }
//   //  check stock

//   if (productData.quantity < quantity) {
//     throw new Error('insufficient stock available');
//   }

//   //   calculate the total price and check  user send total price = correctTotalPrice
//   const correctTotalPrice = productData?.price * quantity;

//   if (totalPrice !== correctTotalPrice) {
//     throw new Error(`incorrect totalPrice. expected: ${correctTotalPrice}`);
//   }

//   //   reduce stock in db
//   productData.quantity = productData.quantity - quantity;
//   if (productData.quantity === 0) productData.inStock = false;
//   await productData.save();

//   //   create order in to order db
//   const order = new OrderModel({ email, product, quantity, totalPrice });
//   await order.save();

//   return order;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrderInToDB = async (orderData: any) => {
  const { email, product, quantity, totalPrice } = orderData;

  // Start a session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the product within the session
    const productData = await ProductModel.findById(product).session(session);

    if (!productData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Check stock availability
    if (productData.quantity < quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock available');
    }

    // Calculate total price and validate
    const correctTotalPrice = productData.price * quantity;
    if (totalPrice !== correctTotalPrice) {
      throw new AppError(httpStatus.BAD_REQUEST, `Incorrect totalPrice. Expected: ${correctTotalPrice}`);
      
    }

    // Update stock and save product
    productData.quantity -= quantity;
    if (productData.quantity === 0) {
      productData.inStock = false;
    }
    await productData.save({ session });

    // Create and save the order
    const order = new OrderModel({ email, product, quantity, totalPrice });
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    // Rollback the transaction on error
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

// get user spesick order 
const getUserOrdersFromDB = async (email: string) => {
  return await OrderModel.find({ email })
    .populate('product', 'name price')
    .sort({ createdAt: -1 });
};


  // get all orders only for admin

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find()
    .populate('product', 'name price')
    .sort({ createdAt: -1 });

    if (!result || result.length === 0) {
      throw new AppError(httpStatus.OK, 'No orders  available');
  }
    return result
};



//  get a single order by ID 
const getOrderByIdFromDB = async (orderId: string) => {
  const order = await OrderModel.findById(orderId).populate('product', 'name price');
  if (!order)  throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
 
  return order;
};


/**
 * Cancel an order (User can cancel only pending orders)
 * @param orderId - Order ID
 * @param email - User email
 */
const cancelOrderInDB = async (orderId: string, email: string) => {
  const order = await OrderModel.findOne({ _id: orderId, email });

  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found or unauthorized');
  

  if (order.status === 'shipped' || order.status === 'delivered') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot cancel shipped or delivered orders');
    
  }

  // restore product stock
  const productData = await ProductModel.findById(order.product);
  if (productData) {
    productData.quantity += order.quantity;
    productData.inStock = true;
    await productData.save();
  }

  order.status = 'canceled';
  await order.save();
  return order;
};



/**
 * Update order status (Admin only)
 * @param orderId - Order ID
 * @param status - New status (pending, shipped, delivered, canceled)
 */
const updateOrderStatusInDB = async (orderId: string, status: 'pending' | 'shipped' | 'delivered' | 'canceled') => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  

  order.status = status;
  await order.save();
  return order;
};




// Calculate Revenue from Orders using Aggregation
const calculateRevenue=async()=>{
  const result =await OrderModel.aggregate([
      {
          $group:{
              _id:null,
              totalRevenue:{$sum:"$totalPrice"}
          }
      }
  ])
  return result[0]?.totalRevenue || 0;
}



export const OrderServices = {
  createOrderInToDB,
  getUserOrdersFromDB,
  getAllOrdersFromDB,
  getOrderByIdFromDB,
  cancelOrderInDB,
  updateOrderStatusInDB,
  calculateRevenue
};
