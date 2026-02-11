import Ponto from '../models/ponto.model.js';

class PontoRepository {
    static async findById(id) {
        // Busca um documento onde o campo 'id' seja igual ao parâmetro (ex: '#1')
        // O .lean() retorna um objeto JS puro, deixando a consulta mais rápida
        return await Ponto.findOne({ id: id }).lean();
    }

    static async findAll() {
        return await Ponto.find().lean();
    }

    static async create(pontoData) {
        // O Mongoose valida e salva automaticamente
        return await Ponto.create(pontoData);
    }

    static async update(id, pontoData) {
        // new: true retorna o objeto já atualizado
        return await Ponto.findOneAndUpdate({ id: id }, pontoData, { new: true }).lean();
    }

    static async remove(id) {
        const deleted = await Ponto.findOneAndDelete({ id: id });
        return !!deleted; // Retorna true se deletou, false se não encontrou
    }
}

export default PontoRepository;