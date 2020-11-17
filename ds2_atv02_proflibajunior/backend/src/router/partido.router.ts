import { Router } from 'express';
import partidoController from '../controller/partido.controller'

class PartidoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de partido
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(partidoController.findAll)
            .post(partidoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(partidoController.findByID)
            .put(partidoController.update)
            .delete(partidoController.delete);
    }

}

export default new PartidoRoute().router;