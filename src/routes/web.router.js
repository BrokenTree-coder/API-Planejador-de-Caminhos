import { Router } from 'express';
import WebController from '../controllers/web.controller.js'; 

const webRouter = Router();

// rota GET / (página inicial), conectada ao método do WebController
webRouter.get('/', WebController.getHomePage);

export default webRouter;