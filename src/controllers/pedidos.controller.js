import { pedidoServices } from '../services/pedidos.service.js';

export async function createOrder(req, res, next) {
    try {
        const datos = req.body;

        const pedidos = await pedidoServices.createOrder(datos);
        res.send(pedidos);
    } catch (error) {
        next(error);
    }
}

export async function getOrder(req, res, next) {
    try {
        const orders = await pedidoServices.getAllOrders();
        res.send(orders);
    } catch (error) {
        next(error);
    }
}

export async function getOrderById(req, res, next) {
    try {
        const idOrder = req.params.oid;
        const order = await pedidoServices.getOrderById(idOrder);
        res.send(order);
    } catch (error) {
        next(error);
    }
}

export async function deleteOrder(req, res, next) {
    try {
        const idOrder = req.params.oid;
        const order = await pedidoServices.deleteOrderById(idOrder);
        res.send(order);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductOrder(req, res, next) {
    try {
        const idProduct = req.params.pid;
        const idOrder = req.params.oid;
        const order = await pedidoServices.removeProductFromOrder(
            idOrder,
            idProduct
        );

        res.send(order);
    } catch (error) {
        next(error);
    }
}
export async function postProductOrder(req, res, next) {
    try {
        const idProduct = req.params.pid;
        const idOrder = req.params.oid;
        const count = req.body.cantidad;

        const order = await pedidoServices.postProductOrder(
            idOrder,
            idProduct,
            count
        );

        res.send(order);
    } catch (error) {
        next(error);
    }
}
