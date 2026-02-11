import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import Ponto from './src/models/ponto.model.js';
import Rota from './src/models/rota.model.js';
import User from './src/models/user.model.js';

// Carrega as variáveis de ambiente (.env) para pegar a MONGO_URI
dotenv.config();

// --- Funções de Leitura (Idênticas às anteriores) ---

async function lerPontos(filePath) {
    const conteudo = await fs.readFile(filePath, 'utf-8');
    const linhas = conteudo.split('\n').filter(Boolean);
    const pontos = linhas.slice(1).map(linha => {
        const campos = linha.replace('\r', '').split(';');
        if (campos.length >= 4) {
            return {
                id: campos[0],
                nome: campos[1],
                latitude: parseFloat(campos[2]),
                longitude: parseFloat(campos[3])
            };
        }
    }).filter(Boolean);
    return pontos;
}

async function lerRotas(filePath) {
    const conteudo = await fs.readFile(filePath, 'utf-8');
    const linhas = conteudo.split('\n').filter(Boolean);
    const rotas = linhas.slice(1).map(linha => {
        const campos = linha.replace('\r', '').split(';');
        if (campos.length >= 5) {
            return {
                id: campos[0],
                nome: campos[1],
                extremidades: [campos[2], campos[3]],
                comprimento: parseFloat(campos[4])
            };
        }
    }).filter(Boolean);
    return rotas;
}

// --- Função Principal de Migração ---

async function migrar() {
    try {
        console.log('🔄 Conectando ao MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado!');

        // 1. Limpeza (Opcional: remove dados antigos para não duplicar)
        console.log('🗑️  Limpando coleções antigas...');
        await Ponto.deleteMany({});
        await Rota.deleteMany({});
        await User.deleteMany({}); // Cuidado: Isso apaga todos os usuários!

        // 2. Ler Arquivos
        console.log('📂 Lendo arquivos de texto...');
        const pontosPath = path.resolve('pontos.txt');
        const rotasPath = path.resolve('rotas.txt');
        
        const pontos = await lerPontos(pontosPath);
        const rotas = await lerRotas(rotasPath);

        // 3. Inserir no MongoDB
        console.log(`🚀 Inserindo ${pontos.length} pontos...`);
        await Ponto.insertMany(pontos);

        console.log(`🚀 Inserindo ${rotas.length} rotas...`);
        await Rota.insertMany(rotas);

        // 4. Criar Usuário Admin Padrão
        // Estou usando o mesmo hash que você tinha no db.json
        console.log('👤 Criando usuário Admin...');
        const adminUser = {
            id: 1,
            nome: "Admin User",
            email: "admin@example.com",
            // Hash da senha 'admin123' (ou a que você usou no json original)
            // Se quiser a senha '0703', você deve colocar o hash correspondente aqui.
            // Vou colocar o hash que estava na sua imagem do db.json:
            password: "$2b$10$Ge.GXRBSFiez37R8U06x1uyqOazrxeT4TNyi4qEWREpETKfYn2SfC", 
            role: "admin"
        };
        await User.create(adminUser);

        console.log('✨ Migração para o MongoDB Atlas concluída com sucesso!');
        console.log('-------------------------------------------------------');
        console.log('Pontos inseridos:', await Ponto.countDocuments());
        console.log('Rotas inseridas:', await Rota.countDocuments());
        console.log('Usuários inseridos:', await User.countDocuments());

    } catch (error) {
        console.error('❌ Erro durante a migração:', error);
    } finally {
        // Fecha a conexão para o script terminar
        await mongoose.connection.close();
        process.exit(0);
    }
}

migrar();