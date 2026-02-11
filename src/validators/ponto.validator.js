import { body, param } from 'express-validator';

// Validação base para os campos de um Ponto
const pontoValidationRules = [
    body('id')
        .isString().withMessage('O ID deve ser um texto.')
        .notEmpty().withMessage('O ID é obrigatório.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('O ID do ponto deve começar com #');
            }
            return true;
        }),
    body('nome')
        .isString().withMessage('O nome deve ser um texto.')
        .notEmpty().withMessage('O nome é obrigatório.'),
    body('latitude')
        .isFloat({ min: -90.0, max: 90.0 })
        .withMessage('A latitude deve ser um número entre -90 e 90.'),
    body('longitude')
        .isFloat({ min: -180.0, max: 180.0 })
        .withMessage('A longitude deve ser um número entre -180 e 180.')
];

// Validação para o ID no parâmetro da URL (ex: /api/pontos/:id)
export const pontoIdValidation = [
    param('id')
        .notEmpty().withMessage('O ID no parâmetro é obrigatório.')
        .custom(value => {
            if (!decodeURIComponent(value).startsWith('#')) {
                throw new Error('O ID do ponto no parâmetro deve começar com #');
            }
            return true;
        })
];

// Regras para POST (criar): todos os campos obrigatórios
export const createPontoValidation = [...pontoValidationRules];

// Regras para PUT (atualizar): todos os campos obrigatórios
export const updatePontoValidation = [...pontoValidationRules];

// Regras para PATCH (atualizar parcial): todos os campos são opcionais
export const patchPontoValidation = [
    body('id').optional().isString().withMessage('O ID deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('O ID do ponto deve começar com #');
            }
            return true;
        }),
    body('nome').optional().isString().withMessage('O nome deve ser um texto.')
        .notEmpty().withMessage('O nome não pode ser vazio.'),
    body('latitude').optional().isFloat({ min: -90.0, max: 90.0 })
        .withMessage('A latitude deve ser um número entre -90 e 90.'),
    body('longitude').optional().isFloat({ min: -180.0, max: 180.0 })
        .withMessage('A longitude deve ser um número entre -180 e 180.')
];