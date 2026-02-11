import CaminhoService from '../services/caminho.service.js';

class CaminhoController {
    /**
     * Lida com a requisição de cálculo de caminho.
     */
    static async calcular(req, res, next) {
        try {
            // Os dados já foram validados pelo middleware (caminho.validator.js)
            const { origem, destino } = req.query;
            
            // Chama o serviço com a lógica de negócio
            const resultado = await CaminhoService.calculaCaminho(origem, destino);
            
            // Envia a resposta de sucesso
            res.status(200).json(resultado);
        } catch (error) {
            // Passa qualquer erro para o middleware de erro global
            next(error);
        }
    }
}

export default CaminhoController;