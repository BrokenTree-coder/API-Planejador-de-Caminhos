import { body, param } from 'express-validator';

// Validação base para os campos de uma Rota
const rotaValidationRules = [
    body('id')
        .isString().withMessage('O ID deve ser um texto.')
        .notEmpty().withMessage('O ID é obrigatório.')
        .custom(value => {
            if (!value.startsWith('&')) {
                throw new Error('O ID da rota deve começar com &');
            }
            return true;
        }),
    body('nome')
        .isString().withMessage('O nome deve ser um texto.')
        .notEmpty().withMessage('O nome é obrigatório.'),
    body('extremidades')
        .isArray({ min: 2, max: 2 })
        .withMessage('As extremidades devem ser um array com exatamente 2 IDs de pontos.'),
    // Valida cada item dentro do array 'extremidades'
    body('extremidades.*')
        .isString().withMessage('Cada extremidade deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('Cada ID de extremidade deve começar com #');
            }
            return true;
        }),
    body('comprimento')
        .isFloat({ gt: 0.0 })
        .withMessage('O comprimento deve ser um número positivo maior que zero.')
];

// Validação para o ID no parâmetro da URL (ex: /api/rotas/:id)
export const rotaIdValidation = [
    param('id')
        .notEmpty().withMessage('O ID no parâmetro é obrigatório.')
        .custom(value => {
            if (!decodeURIComponent(value).startsWith('&')) {
                throw new Error('O ID da rota no parâmetro deve começar com &');
            }
            return true;
        })
];

// Regras para POST (criar): todos os campos obrigatórios
export const createRotaValidation = [...rotaValidationRules];

// Regras para PUT (atualizar): todos os campos obrigatórios
export const updateRotaValidation = [...rotaValidationRules];

// Regras para PATCH (atualizar parcial): todos os campos são opcionais
export const patchRotaValidation = [
    body('id').optional().isString().withMessage('O ID deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('&')) {
                throw new Error('O ID da rota deve começar com &');
            }
            return true;
        }),
    body('nome').optional().isString().withMessage('O nome deve ser um texto.')
        .notEmpty().withMessage('O nome não pode ser vazio.'),
    body('extremidades').optional().isArray({ min: 2, max: 2 })
        .withMessage('As extremidades devem ser um array com exatamente 2 IDs de pontos.'),
    body('extremidades.*').optional().isString().withMessage('Cada extremidade deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('Cada ID de extremidade deve começar com #');
            }
            return true;
        }),
    body('comprimento').optional().isFloat({ gt: 0.0 })
        .withMessage('O comprimento deve ser um número positivo maior que zero.')
];