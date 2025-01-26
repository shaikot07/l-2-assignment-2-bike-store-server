import mongoose from "mongoose";


export interface IOrder{
    user: mongoose.Types.ObjectId;
    email:string;
    product:string;
    quantity:number;
    totalPrice:number;
    status: 'pending' | 'completed' | 'cancelled' |'shipped' |'delivered'|'canceled' ;
}