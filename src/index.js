
import express from 'express';
import usersRouter from './routes/user.router.js'; 
import authRouter from './routes/auth.router.js';   
import caminhoRouter from './routes/caminho.router.js'; 
import pontosRouter from './routes/ponto.router.js';  
import rotasRouter from './routes/rota.router.js';
import webRouter from './routes/web.router.js';
import authMiddleware from './middlewares/auth.middleware.js';
import dotenv from 'dotenv';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import path from 'path'; 
import { fileURLToPath } from 'url';
import connectDB from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração do pug e static
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Definição das rotas
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/caminho', authMiddleware, caminhoRouter); 
app.use('/api/pontos', authMiddleware, pontosRouter); 
app.use('/api/rotas', authMiddleware, rotasRouter);   
app.use('/', webRouter); // Rotas web (sem /api)

// Rotas de 404 e erro global
app.use((req, res, next) => {
    res.status(404).json({ mensagem: "A rota solicitada não existe." });
});
app.use(globalErrorHandler);

// Inicialização do servidor
// Primeiro conecta ao banco, depois abre a porta 3000
const PORTA = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORTA, () => {
        console.log(`Servidor rodando na porta ${PORTA}`);
    });
}).catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
});