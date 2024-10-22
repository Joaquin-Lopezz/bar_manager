import { toPOJO } from '../../pojo.js';

export class pedidosDaoMongose {
    constructor(pedidosModel) {
        this.pedidosModel = pedidosModel;
    }

    async createOrder(datos) {
        const pedido = await this.pedidosModel.create(datos);

        return toPOJO(pedido);
    }

    async getAllOrders() {
        return await this.pedidosModel.find();
    }

    async getOrderById(idOrder) {
        return await this.pedidosModel.findById(idOrder);
    }

    async deleteOrderById(idOrder) {
        return await this.pedidosModel.findByIdAndDelete(idOrder);
    }

    async removeProductFromOrder(idOrder, idProducto) {
        const pedido = await this.pedidosModel.findByIdAndUpdate(
            idOrder,
            {
                $pull: { productos: { productoId: idProducto } }, // Asegúrate de que el campo coincide con el esquema
            },
            { new: true } 
        );

        console.log(pedido);

        return pedido;
    }
}
