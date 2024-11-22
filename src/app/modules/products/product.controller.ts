import { Request, Response } from 'express';
import { ProductServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.addProductInToDB(product);
    res.status(200).json({
      success: true,
      message: 'bike is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed to create bike',
      success: false,
      error: err,
    });
  }
};

// get product 
const getAllProducts= async ()=>{
    
}


export const ProductControllers={
    createProduct
}