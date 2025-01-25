import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const orderSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)


export const OrderModel= model<IOrder>('Order', orderSchema)