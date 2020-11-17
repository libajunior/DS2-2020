import { Router } from 'express';
import candidatoController from '../controller/candidato.controller'

class CandidatoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de candidato
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(candidatoController.findAll)
            .post(candidatoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(candidatoController.findByID)
            .put(candidatoController.update)
            .delete(candidatoController.delete);
    }

}

export default new CandidatoRoute().router;