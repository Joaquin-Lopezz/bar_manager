import { Schema } from 'mongoose';

export const productSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: {
            type: Number,
            required: true,
            min: [0, 'precio debe ser un numero positivo'],
        },
        thumbnail: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ['bebidas', 'comidas', 'postres'], // Solo acepta estos valores
            message: '{VALUE} is not a valid category', // Mensaje opcional para error
        },
    },
    {
        strict: 'throw',
        versionKey: false,
    }
);
