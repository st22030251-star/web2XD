import mongoose from 'mongoose';

const baseSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    grupo: {
        type: String,
        required: true,
        trim: true
    },
    puntosextra: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export const baseModel = mongoose.model('Base', baseSchema);