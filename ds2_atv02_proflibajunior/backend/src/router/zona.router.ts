import { Router } from 'express';
import zonaController from '../controller/zona.controller'

class ZonaRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de zona
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(zonaController.findAll)
            .post(zonaController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(zonaController.findByID)
            .put(zonaController.update)
            .delete(zonaController.delete);
    }

}

export default new ZonaRoute().router;