import { Router } from 'express';
import secaoController from '../controller/secao.controller'

class SecaoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de secao
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(secaoController.findAll)
            .post(secaoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(secaoController.findByID)
            .put(secaoController.update)
            .delete(secaoController.delete);
    }

}

export default new SecaoRoute().router;