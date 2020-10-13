import { Router } from 'express';
import cidadeController from '../controller/cidade.controller'

class CidadeRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de cidade
        this.init();
    }

    private init(): void {
        this.router.get('/', cidadeController.findAll)
        this.router.post('/', cidadeController.create)
    }

}

export default new CidadeRoute().router;