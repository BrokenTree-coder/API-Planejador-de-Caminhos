import RotaService from '../services/rota.service.js';

class RotaController {
    /**
     * Lida com a requisição de criação de uma nova rota (POST).
     */
    static async create(req, res, next) {
        try {
            const novaRota = await RotaService.create(req.body);
            res.status(201).json(novaRota); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de listagem de todas as rotas (GET).
     */
    static async getAll(req, res, next) {
        try {
            const rotas = await RotaService.getAll();
            res.status(200).json(rotas);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de busca de uma rota por ID (GET /:id).
     */
    static async getById(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id); // Decodifica o ID da URL
            const rota = await RotaService.getById(id);
            res.status(200).json(rota);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização completa de uma rota (PUT /:id).
     */
    static async update(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            const rotaAtualizada = await RotaService.update(id, req.body);
            res.status(200).json(rotaAtualizada); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização parcial de uma rota (PATCH /:id).
     */
    static async patch(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            const rotaAtualizada = await RotaService.update(id, req.body);
            res.status(200).json(rotaAtualizada); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de remoção de uma rota (DELETE /:id).
     */
    static async remove(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            await RotaService.remove(id);
            res.status(204).send(); // 204 No Content
        } catch (error) {
            next(error);
        }
    }
}

export default RotaController;