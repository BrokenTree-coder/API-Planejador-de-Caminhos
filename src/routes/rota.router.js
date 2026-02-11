import { Router } from 'express';
import RotaController from '../controllers/rota.controller.js';
import { checkRole } from '../middlewares/permission.middleware.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import {
    rotaIdValidation,
    createRotaValidation,
    updateRotaValidation,
    patchRotaValidation
} from '../validators/rota.validator.js';

const rotasRouter = Router();

// Rotas de leitura (para qualquer usuário logado) 

// GET /api/rotas
rotasRouter.get(
    '/', 
    RotaController.getAll
);

// GET /api/rotas/:id
rotasRouter.get(
    '/:id', 
    rotaIdValidation, 
    handleValidationErrors, 
    RotaController.getById
);

// Rotas de escrita (apenas para admin) 

// POST /api/rotas
rotasRouter.post(
    '/',
    checkRole('admin'), 
    createRotaValidation,
    handleValidationErrors,
    RotaController.create
);

// PUT /api/rotas/:id
rotasRouter.put(
    '/:id',
    checkRole('admin'), 
    rotaIdValidation,
    updateRotaValidation,
    handleValidationErrors,
    RotaController.update
);

// PATCH /api/rotas/:id
rotasRouter.patch(
    '/:id',
    checkRole('admin'), 
    rotaIdValidation,
    patchRotaValidation,
    handleValidationErrors,
    RotaController.patch
);

// DELETE /api/rotas/:id
rotasRouter.delete(
    '/:id',
    checkRole('admin'), 
    rotaIdValidation,
    handleValidationErrors,
    RotaController.remove
);

export default rotasRouter;