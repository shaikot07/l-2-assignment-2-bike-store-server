import express from 'express'
import { ProductControllers } from './product.controller';
const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/create-product',ProductControllers.createProduct);



export const ProductRoutes= router;