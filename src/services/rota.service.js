import RotaRepository from '../repositories/rota.repository.js';
import PontoRepository from '../repositories/ponto.repository.js'; // Precisamos dele para validar as extremidades

class RotaService {
    /**
     * Lógica de negócio para criar uma nova rota.
     * @param {object} rotaData - Dados da rota validados.
     * @returns {Promise<object>} A rota criada.
     */
    static async create(rotaData) {
        // Regra de negócio: verificar se o ID já existe
        const existingRota = await RotaRepository.findById(rotaData.id);
        if (existingRota) {
            const error = new Error('Uma rota com este ID já existe.');
            error.statusCode = 409; // Conflict
            throw error;
        }

        // Regra de negócio: verificar se as extremidades existem
        const ponto1 = await PontoRepository.findById(rotaData.extremidades[0]);
        const ponto2 = await PontoRepository.findById(rotaData.extremidades[1]);
        if (!ponto1 || !ponto2) {
            const error = new Error('Uma ou ambas as extremidades (pontos) desta rota não existem.');
            error.statusCode = 400; 
            throw error;
        }
        
        return RotaRepository.create(rotaData);
    }

    /**
     * Lógica de negócio para buscar todas as rotas.
     * @returns {Promise<Array<object>>}
     */
    static async getAll() {
        return RotaRepository.findAll();
    }

    /**
     * Lógica de negócio para buscar uma rota pelo ID.
     * @param {string} id - O ID da rota.
     * @returns {Promise<object>}
     */
    static async getById(id) {
        const rota = await RotaRepository.findById(id);
        if (!rota) {
            const error = new Error('Rota não encontrada.');
            error.statusCode = 404;
            throw error;
        }
        return rota;
    }

    /**
     * Lógica de negócio para atualizar uma rota (PUT/PATCH).
     * @param {string} id - O ID da rota a ser atualizada.
     * @param {object} rotaData - Dados para atualizar.
     * @returns {Promise<object>} A rota atualizada.
     */
    static async update(id, rotaData) {
        // Regra de negócio: verificar se a rota existe
        const existingRota = await RotaRepository.findById(id);
        if (!existingRota) {
            const error = new Error('Rota não encontrada.');
            error.statusCode = 404;
            throw error;
        }

        // Regra de negócio: se o ID está sendo alterado, verificar conflito
        if (rotaData.id && rotaData.id !== id) {
            const conflictingRota = await RotaRepository.findById(rotaData.id);
            if (conflictingRota) {
                const error = new Error('O novo ID fornecido já está em uso por outra rota.');
                error.statusCode = 409; 
                throw error;
            }
        }

        // Regra de negócio: se as extremidades estão sendo alteradas, verificar se elas existem
        if (rotaData.extremidades) {
            const ponto1 = await PontoRepository.findById(rotaData.extremidades[0]);
            const ponto2 = await PontoRepository.findById(rotaData.extremidades[1]);
            if (!ponto1 || !ponto2) {
                const error = new Error('Uma ou ambas as novas extremidades (pontos) desta rota não existem.');
                error.statusCode = 400; 
                throw error;
            }
        }

        const updatedRota = await RotaRepository.update(id, rotaData);
        return updatedRota;
    }

    /**
     * Lógica de negócio para remover uma rota.
     * @param {string} id - O ID da rota a ser removida.
     */
    static async remove(id) {
        // Regra de negócio: verificar se a rota existe
        const existingRota = await RotaRepository.findById(id);
        if (!existingRota) {
            const error = new Error('Rota não encontrada.');
            error.statusCode = 404;
            throw error;
        }

        // (Não há regras de dependência para remover uma rota, é seguro)
        await RotaRepository.remove(id);
    }
}

export default RotaService;