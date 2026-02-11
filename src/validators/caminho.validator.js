import { query } from 'express-validator';

// Validação para os query params da rota de cálculo
export const calculaCaminhoValidation = [
    // Valida o query param 'origem'
    query('origem')
        .notEmpty().withMessage('O ponto de origem é obrigatório.')
        .isString().withMessage('O ponto de origem deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('O ID de origem deve começar com #');
            }
            return true;
        }),
    
    // Valida o query param 'destino'
    query('destino')
        .notEmpty().withMessage('O ponto de destino é obrigatório.')
        .isString().withMessage('O ponto de destino deve ser um texto.')
        .custom(value => {
            if (!value.startsWith('#')) {
                throw new Error('O ID de destino deve começar com #');
            }
            return true;
        })
];