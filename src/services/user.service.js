import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository.js';
import { UserResponseDTO } from '../dtos/user.dto.js';

class UserService {
    /**
     * Lógica de negócio para criar um usuário.
     */
    static async create(userData) {
        // Regra de negócio: verificar se o email já está em uso.
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            const error = new Error('Este email já está em uso.');
            error.statusCode = 409; // Conflict
            throw error;
        }

        // Regra de negócio: fazer hash da senha.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        const newUserFromDb = await UserRepository.create({
            nome: userData.nome,
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user'
        });

        return new UserResponseDTO(newUserFromDb);
    }

    /**
     * Lógica de negócio para buscar todos os usuários.
     */
    static async getAll() {
        const users = await UserRepository.findAll();
        return users.map(user => new UserResponseDTO(user));
    }

    /**
     * Lógica de negócio para buscar um usuário pelo ID.
     */
    static async getById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return new UserResponseDTO(user);
    }

    /**
     * Lógica de negócio para atualizar um usuário.
     */
    static async update(id, userData) {
        // Reutiliza o getById para verificar se o usuário existe.
        await this.getById(id); 

        // Se uma nova senha for fornecida, faz o hash dela.
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }

        const updatedUser = await UserRepository.update(id, userData);
        return new UserResponseDTO(updatedUser);
    }

    /**
     * Lógica de negócio para remover um usuário.
     */
    static async remove(id) {
        // Reutiliza o getById para verificar se o usuário existe.
        await this.getById(id);
        return await UserRepository.remove(id);
    }
}

export default UserService;