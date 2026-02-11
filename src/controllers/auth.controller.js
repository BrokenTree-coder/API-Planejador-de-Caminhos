import AuthService from '../services/auth.service.js';

class AuthController {
    /**
     * Lida com a requisição de login.
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            // Chama o serviço para executar a lógica de negócio.
            const token = await AuthService.login(email, password);
            
            // Envia a resposta de sucesso com o token.
            res.status(200).json({ message: 'Login bem-sucedido!', token });
        } catch (error) {
            // Passa qualquer erro para o middleware de erro global.
            next(error);
        }
    }
}

export default AuthController;