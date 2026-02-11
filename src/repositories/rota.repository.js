import Rota from '../models/rota.model.js';

class RotaRepository {
    static async findById(id) {
        return await Rota.findOne({ id: id }).lean();
    }

    static async findAll() {
        return await Rota.find().lean();
    }

    static async findAllConnectedToPoint(pontoId) {
        // O Mongoose é inteligente: se 'extremidades' é um array,
        // ele busca qualquer rota que contenha 'pontoId' dentro desse array.
        return await Rota.find({ extremidades: pontoId }).lean();
    }

    static async create(rotaData) {
        return await Rota.create(rotaData);
    }

    static async update(id, rotaData) {
        return await Rota.findOneAndUpdate({ id: id }, rotaData, { new: true }).lean();
    }

    static async remove(id) {
        const deleted = await Rota.findOneAndDelete({ id: id });
        return !!deleted;
    }
}

export default RotaRepository;