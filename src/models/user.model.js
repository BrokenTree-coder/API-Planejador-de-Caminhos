import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: Number, // Mantendo compatibilidade com seus IDs numéricos
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'usuario'], // Validação extra: só aceita essas roles
        default: 'usuario'
    }
});

const User = mongoose.model('User', userSchema);
export default User;