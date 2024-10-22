import {
    getProductsByCategory,
    getProducts,
    createProduct,deleteProduct,updateProduct
} from '../../controllers/products.controller.js';
import { uploadMiddleware } from '../../config/multer.js';
import { Router } from 'express';
export const productsRouter = Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:category', getProductsByCategory);

productsRouter.post('/', uploadMiddleware, createProduct);

productsRouter.put('/:pid',uploadMiddleware,updateProduct)

productsRouter.delete('/:pid',uploadMiddleware,deleteProduct)
