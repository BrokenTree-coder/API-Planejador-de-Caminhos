import { body } from 'express-validator';

export const loginValidation = [
    body('email').isEmail().withMessage('Email inválido.'),
    body('password').notEmpty().withMessage('Senha é obrigatória.')
];