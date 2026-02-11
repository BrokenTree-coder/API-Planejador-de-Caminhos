import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { checkRole } from '../middlewares/permission.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import { 
    createUserValidation, 
    updateUserValidation,
    patchUserValidation,
    userIdValidation 
} from '../validators/user.validator.js';

const usersRouter = Router();

// POST: Criar um novo usuário (Apenas Admin)
usersRouter.post(
    '/',
    authMiddleware,
    checkRole('admin'),
    createUserValidation,
    handleValidationErrors,
    UserController.create
);

// GET: Listar todos os usuários
usersRouter.get(
    '/',
    UserController.getAll
);

// GET: Obter usuário por ID
usersRouter.get(
    '/:id',
    userIdValidation,
    handleValidationErrors,
    UserController.getById
);

// PUT: Atualizar um usuário
usersRouter.put(
    '/:id',
    authMiddleware,
    userIdValidation,
    updateUserValidation,
    handleValidationErrors,
    UserController.update
);

// PATCH: Atualizar um usuário parcialmente
usersRouter.patch(
    '/:id',
    authMiddleware,
    userIdValidation,
    patchUserValidation,
    handleValidationErrors,
    UserController.patch
);

// DELETE: Remover um usuário (Apenas Admin)
usersRouter.delete(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    userIdValidation,
    handleValidationErrors,
    UserController.remove
);

export default usersRouter;