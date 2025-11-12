import mongoose from 'mongoose';

const baseSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    grupo: {
        type: String,
        trim: true
    },
    puntosextra: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export const baseModel = mongoose.model('Base', baseSchema);