import { Schema } from 'mongoose';

export const usersSchema = new Schema(
    {
        dni: { type: String, require: true, unique: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        password: { type: String, required: true },
        rol: {
            type: String,
            required: true,
            enum: ['mesero', 'admin', 'cajero'],
        },
    },
    {
        strict: 'throw',
        versionKey: false,
    }
);
