import { Router } from 'express';
import eleitorController from '../controller/eleitor.controller'

class EleitorRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de eleitor
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(eleitorController.findAll)
            .post(eleitorController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(eleitorController.findByID)
            .put(eleitorController.update)
            .delete(eleitorController.delete);
    }

}

export default new EleitorRoute().router;