
import { ProductModel } from '../products/product.model';
import { OrderModel } from './order.model';

const createOrderInToDB = async (orderData:any) => {
  const { email, product, quantity, totalPrice } = orderData;
  const productData = await ProductModel.findById(product);

  if (!productData) {
    throw new Error('product not found');
  }
  //  check stock

  if (productData.quantity < quantity) {
    throw new Error('insufficient stock available');
  }

  //   calculate the total price and check  user send total price = correctTotalPrice
  const correctTotalPrice = productData?.price * quantity;

  if (totalPrice !== correctTotalPrice) {
    throw new Error(`incorrect totalPrice. expected: ${correctTotalPrice}`);
  }

  //   reduce stock in db
  productData.quantity = productData.quantity - quantity;
  if (productData.quantity === 0) productData.inStock = false;
  await productData.save();

  //   create order in to order db
  const order = new OrderModel({ email, product, quantity, totalPrice });
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
  calculateRevenue
};
