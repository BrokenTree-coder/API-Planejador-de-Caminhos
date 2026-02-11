import User from '../models/user.model.js';

class UserRepository {
    static async findById(id) {
        return await User.findOne({ id: id }).lean();
    }

    static async findByEmail(email) {
        return await User.findOne({ email: email }).lean();
    }

    static async findAll() {
        return await User.find().lean(); // Retorna sem a senha se definir no select, mas deixaremos padrão por enquanto
    }

    static async create(userData) {
        // Lógica para auto-incremento no MongoDB
        // Busca o usuário com o maior ID (ordem decrescente)
        const lastUser = await User.findOne().sort({ id: -1 });
        const nextId = lastUser ? lastUser.id + 1 : 1;

        const newUser = {
            id: nextId,
            ...userData
        };

        return await User.create(newUser);
    }

    static async update(id, userData) {
        return await User.findOneAndUpdate({ id: id }, userData, { new: true }).lean();
    }

    static async remove(id) {
        const deleted = await User.findOneAndDelete({ id: id });
        return !!deleted;
    }
}

export default UserRepository;