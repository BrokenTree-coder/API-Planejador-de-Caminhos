import PontoService from '../services/ponto.service.js';

class PontoController {
    /**
     * Lida com a requisição de criação de um novo ponto (POST).
     */
    static async create(req, res, next) {
        try {
            // O corpo (req.body) já foi validado pelo middleware
            const novoPonto = await PontoService.create(req.body);
            res.status(201).json(novoPonto); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de listagem de todos os pontos (GET).
     */
    static async getAll(req, res, next) {
        try {
            const pontos = await PontoService.getAll();
            res.status(200).json(pontos); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de busca de um ponto por ID (GET /:id).
     */
    static async getById(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id); // Decodifica o ID da URL
            const ponto = await PontoService.getById(id);
            res.status(200).json(ponto); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização completa de um ponto (PUT /:id).
     */
    static async update(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            const pontoAtualizado = await PontoService.update(id, req.body);
            res.status(200).json(pontoAtualizado); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização parcial de um ponto (PATCH /:id).
     */
    static async patch(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            // Reutiliza a lógica do service.update para o patch
            const pontoAtualizado = await PontoService.update(id, req.body);
            res.status(200).json(pontoAtualizado); 
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de remoção de um ponto (DELETE /:id).
     */
    static async remove(req, res, next) {
        try {
            const id = decodeURIComponent(req.params.id);
            await PontoService.remove(id);
            res.status(204).send(); // 204 No Content
        } catch (error) {
            next(error);
        }
    }
}

export default PontoController;