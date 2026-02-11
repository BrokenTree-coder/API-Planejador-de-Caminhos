import UserService from '../services/user.service.js';

class UserController {
    static async create(req, res, next) {
        try {
            const userDto = await UserService.create(req.body);
            res.status(201).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const usersDto = await UserService.getAll();
            res.status(200).json(usersDto);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const userDto = await UserService.getById(id);
            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const userDto = await UserService.update(id, req.body);
            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    // O método de atualização (PUT) e parcial (PATCH) podem usar o mesmo service
    static async patch(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const userDto = await UserService.update(id, req.body);
            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    static async remove(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await UserService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;