import PontoRepository from '../repositories/ponto.repository.js';
import RotaRepository from '../repositories/rota.repository.js'; 

class PontoService {
    /**
     * Lógica de negócio para criar um novo ponto.
     * @param {object} pontoData - Dados do ponto validados.
     * @returns {Promise<object>} O ponto criado.
     */
    static async create(pontoData) {
        // Regra de negócio: verificar se o ID já existe
        const existingPonto = await PontoRepository.findById(pontoData.id);
        if (existingPonto) {
            const error = new Error('Um ponto com este ID já existe.');
            error.statusCode = 409; 
            throw error;
        }
        
        return PontoRepository.create(pontoData);
    }

    /**
     * Lógica de negócio para buscar todos os pontos.
     * @returns {Promise<Array<object>>}
     */
    static async getAll() {
        return PontoRepository.findAll();
    }

    /**
     * Lógica de negócio para buscar um ponto pelo ID.
     * @param {string} id - O ID do ponto.
     * @returns {Promise<object>}
     */
    static async getById(id) {
        const ponto = await PontoRepository.findById(id);
        if (!ponto) {
            const error = new Error('Ponto não encontrado.');
            error.statusCode = 404; 
            throw error;
        }
        return ponto;
    }

    /**
     * Lógica de negócio para atualizar um ponto (PUT/PATCH).
     * @param {string} id - O ID do ponto a ser atualizado.
     * @param {object} pontoData - Dados para atualizar.
     * @returns {Promise<object>} O ponto atualizado.
     */
    static async update(id, pontoData) {
        // Regra de negócio: verificar se o ponto existe
        const existingPonto = await PontoRepository.findById(id);
        if (!existingPonto) {
            const error = new Error('Ponto não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        // Regra de negócio: se o ID está sendo alterado, verificar conflito
        if (pontoData.id && pontoData.id !== id) {
            const conflictingPonto = await PontoRepository.findById(pontoData.id);
            if (conflictingPonto) {
                const error = new Error('O novo ID fornecido já está em uso por outro ponto.');
                error.statusCode = 409; 
                throw error;
            }
        }

        const updatedPonto = await PontoRepository.update(id, pontoData);
        return updatedPonto;
    }

    /**
     * Lógica de negócio para remover um ponto.
     * @param {string} id - O ID do ponto a ser removido.
     */
    static async remove(id) {
        // Regra de negócio: verificar se o ponto existe
        const existingPonto = await PontoRepository.findById(id);
        if (!existingPonto) {
            const error = new Error('Ponto não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        // Regra de negócio: verificar se o ponto está em uso por alguma rota
        const connectedRotas = await RotaRepository.findAllConnectedToPoint(id);
        if (connectedRotas.length > 0) {
            const error = new Error('Este ponto não pode ser removido pois está sendo usado por uma ou mais rotas.');
            error.statusCode = 409; 
            throw error;
        }

        await PontoRepository.remove(id);
    }
}

export default PontoService;