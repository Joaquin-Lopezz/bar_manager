import { getDaoPedidos } from '../dao/pedidos/pedidos.dao.js';

const pedidoDao = getDaoPedidos();

class PedidoService {
    async createOrder(datos) {
        return await pedidoDao.createOrder(datos);
    }
    async getAllOrders() {
        return await pedidoDao.getAllOrders();
    }

    async getOrderById(idOrder) {
        return await pedidoDao.getOrderById(idOrder);
    }

    async deleteOrderById(idOrder) {
        return await pedidoDao.deleteOrderById(idOrder);
    }

    async postProductOrder(idOrder, idProduct, cantidad) {
        const datos = {
            productoId: idProduct,
            cantidad: cantidad,
        };
        let orden = await this.getOrderById(idOrder);
        if (!orden) {
            throw new Error('Orden no encontrada');
        }
        const productoExistente = orden.productos.find(
            (producto) => producto.productoId.toString() === idProduct
        );

        if (productoExistente) {
            productoExistente.cantidad = cantidad;
        } else {
            orden.productos.push(datos);
        }

        const ordenActualizada = await orden.save();
        return ordenActualizada;
    }

    async removeProductFromOrder(idOrder, idProduct) {
        const order = await this.getOrderById(idOrder);

        const productIndex = order.productos.findIndex(
            (producto) =>
                producto.productoId.toString() === idProduct.toString()
        );
        if (productIndex == -1) {
            return undefined;
        }
        order.productos.splice(productIndex, 1);
        await order.save();

        const updatedOrder = await this.getOrderById(idOrder);
        return updatedOrder;
    }
}

export const pedidoServices = new PedidoService();
8;
