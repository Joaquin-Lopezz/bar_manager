import { model } from 'mongoose';
import { pedidosSchema } from './mongoose/pedidos.model.js';
import { pedidosDaoMongose } from './mongoose/pedidos.dao.mongoose.js';

const pedidosModel = model('pedidos', pedidosSchema);
const daoPedidos = new pedidosDaoMongose(pedidosModel);

export function getDaoPedidos() {
    return daoPedidos;
}
