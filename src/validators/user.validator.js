import { body, param } from 'express-validator';

export const createUserValidation = [
    body('nome').notEmpty().withMessage('Nome é obrigatório.'),
    body('email').isEmail().withMessage('Deve ser um email válido.'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Role deve ser "admin" ou "user".')
];

export const updateUserValidation = [
    body('nome').notEmpty().withMessage('Nome é obrigatório.'),
    body('email').isEmail().withMessage('Deve ser um email válido.'),
    body('password').optional().isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    body('role').isIn(['admin', 'user']).withMessage('Role deve ser "admin" ou "user".')
];

export const patchUserValidation = [
    body('nome').optional().notEmpty().withMessage('Nome não pode ser vazio.'),
    body('email').optional().isEmail().withMessage('Deve ser um email válido.'),
    body('password').optional().isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Role deve ser "admin" ou "user".')
];

export const userIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('O ID do usuário deve ser um número inteiro positivo.')
];