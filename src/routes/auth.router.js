import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { loginValidation } from '../validators/auth.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const authRouter = Router();

// Rota POST /login - Autentica um usuário e retorna um token.
authRouter.post(
    '/login',
    loginValidation,         // Aplica as regras de validação.
    handleValidationErrors,  // Lida com os erros de validação, se houver.
    AuthController.login     // Se a validação passar, chama o controlador.
);

export default authRouter;