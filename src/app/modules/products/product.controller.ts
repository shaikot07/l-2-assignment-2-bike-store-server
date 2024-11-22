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

// get all product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductServices.getAllProductToDB(searchTerm);
    res.status(200).json({
      success: true,
      message: 'bike is retrieved successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', success: false, error });
    // res.status(500).json({
    //     message: 'An error occurred while fetching the products',
    //     success: false,
    //     error: {
    //       message: error.message,
    //       stack: process.env.NODE_ENV === 'development' ? error.stack : null // Include stack trace in development mode
    //     }
    //   });
  }
};
// get single product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await ProductServices.getProductById(productId);
    // console.log("log from controlar",product);

    // If product is not found, return 404 error
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });
    }
    res.json({
      message: 'Product retrieved successfully',
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: 'server error', success: false, error });
  }
};

// updated single product by id
const updatedVProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
  const productData = req.body;
  const product = await ProductServices.updatedProduct(productId, productData);
  if (!product) {
    return res
      .status(404)
      .json({ message: 'Product not found', success: false });
  }
  res.json({
    message: 'product updated successfully',
    success: true,
    data: product,
  });
  } catch (error) {
    res.status(400).json({ message: 'update failed', success: false, error });
  }
};

const deleteProduct=async(req:Request,res:Response)=>{
    try {
        const productId = req.params.id;
      const product = await ProductServices.deletedProduct(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: 'Product not found', success: false });
      }
      res.json({
        message: 'product deleted successfully',
        success: true,
        data: product,
      });
      } catch (error) {
        res.status(400).json({ message: 'delete failed', success: false, error });
      }
}


export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updatedVProduct,
  deleteProduct
};
