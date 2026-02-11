import PontoService from '../services/ponto.service.js';
import RotaService from '../services/rota.service.js';

class WebController {
  /**
     * Busca todos os pontos e rotas e renderiza a página inicial.
     */
    static async getHomePage(req, res, next) {
        try {
            // Busca ambos os conjuntos de dados
            const pontos = await PontoService.getAll();
            const rotas = await RotaService.getAll(); 

            // Renderiza a view: envia 'pontos' e 'rotas' para o template
            res.render('home', {
                title: 'Planejador de Caminhos',
                pontos: pontos,
                rotas: rotas
            });
        } catch (error) {
            next(error);
        }
    }

}

export default WebController;