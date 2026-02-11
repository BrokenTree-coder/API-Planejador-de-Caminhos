import { Router } from 'express';
import CaminhoController from '../controllers/caminho.controller.js';
import { calculaCaminhoValidation } from '../validators/caminho.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const caminhoRouter = Router();

/**
 * Define a rota GET /
 * A rota completa será /api/caminho
 * Exemplo de requisição: GET /api/caminho?origem=#1&destino=#2
 */
caminhoRouter.get(
    '/',
    calculaCaminhoValidation, // Aplica as regras de validação
    handleValidationErrors,   // Lida com os erros de validação
    CaminhoController.calcular  // Se tudo OK, chama o controlador
);

export default caminhoRouter;