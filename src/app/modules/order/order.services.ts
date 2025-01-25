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

const getUserOrdersFromDB = async (email: string) => {
  return await OrderModel.find({ email })
    .populate('product', 'name price')
    .sort({ createdAt: -1 });
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
  calculateRevenue
};
