import { Schema } from 'mongoose';

const productoSchema = new Schema({
    productoId  : { type: Schema.Types.ObjectId, required: true },
    cantidad: { type: Number, required: true, min: 1 }, 
});

export const pedidosSchema = new Schema(
    {
        dni: { type: String, required: true },
        nombre: { type: String, required: true },
        productos: [productoSchema],
        status: {
            type: String,
            enum: ['sin entregar', 'entregado', 'cancelado'],
            default: 'sin entregar',
        },
        fecha: { type: Date, default: Date.now },
    },
    {
        strict: 'throw',
        versionKey: false,
    }
);
