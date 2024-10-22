import { Router } from 'express';



import { createOrder,deleteProductOrder, getOrder, getOrderById, deleteOrder,postProductOrder} from '../../controllers/pedidos.controller.js';

export const pedidoRouter = Router();

pedidoRouter.post('/', createOrder);

pedidoRouter.get('/', getOrder);

pedidoRouter.get('/:oid', getOrderById);

pedidoRouter.post('/:oid/:pid', postProductOrder);

pedidoRouter.delete('/:oid', deleteOrder);

pedidoRouter.delete('/:oid/:pid', deleteProductOrder);
