import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

// Função para conectar ao banco
const connectDB = async () => {
    try {
        await mongoose.connect(uri); // A opção dbName já está na string de conexão (/planejador)
        console.log('Conectado com sucesso ao MongoDB Atlas via Mongoose.');
    } catch (error) {
        console.error('Falha ao conectar ao banco de dados via Mongoose:', error);
        process.exit(1); // Encerra o processo com erro
    }
};

// Exportamos a função de conexão
export default connectDB;