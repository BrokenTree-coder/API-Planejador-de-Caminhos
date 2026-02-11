import mongoose from 'mongoose';

const pontoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true // Garante que não haja IDs repetidos (ex: #1)
    },
    nome: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const Ponto = mongoose.model('Ponto', pontoSchema);
export default Ponto;