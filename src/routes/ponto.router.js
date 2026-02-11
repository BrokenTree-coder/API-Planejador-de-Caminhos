import { Router } from 'express';
import PontoController from '../controllers/ponto.controller.js';
import { checkRole } from '../middlewares/permission.middleware.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import {
    pontoIdValidation,
    createPontoValidation,
    updatePontoValidation,
    patchPontoValidation
} from '../validators/ponto.validator.js';

const pontosRouter = Router();

// Rotas de leitura (para qualquer usuário logado) 

// GET /api/pontos
pontosRouter.get(
    '/', 
    PontoController.getAll
);

// GET /api/pontos/:id
pontosRouter.get(
    '/:id', 
    pontoIdValidation, 
    handleValidationErrors, 
    PontoController.getById
);

// Rotas de escrita (apenas para admin) 

// POST /api/pontos
pontosRouter.post(
    '/',
    checkRole('admin'), 
    createPontoValidation,
    handleValidationErrors,
    PontoController.create
);

// PUT /api/pontos/:id
pontosRouter.put(
    '/:id',
    checkRole('admin'), 
    pontoIdValidation,
    updatePontoValidation,
    handleValidationErrors,
    PontoController.update
);

// PATCH /api/pontos/:id
pontosRouter.patch(
    '/:id',
    checkRole('admin'), 
    pontoIdValidation,
    patchPontoValidation,
    handleValidationErrors,
    PontoController.patch
);

// DELETE /api/pontos/:id
pontosRouter.delete(
    '/:id',
    checkRole('admin'), 
    pontoIdValidation,
    handleValidationErrors,
    PontoController.remove
);

export default pontosRouter;