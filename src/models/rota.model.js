import mongoose from 'mongoose';

const rotaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true // ex: &101A
    },
    nome: {
        type: String,
        required: true
    },
    extremidades: {
        type: [String], // Array de Strings
        required: true,
        validate: [arrayLimit, '{PATH} deve ter exatamente 2 extremidades']
    },
    comprimento: {
        type: Number,
        required: true
    }
});

function arrayLimit(val) {
    return val.length === 2;
}

const Rota = mongoose.model('Rota', rotaSchema);
export default Rota;