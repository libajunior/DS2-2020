import { Router } from 'express';
import votacaoController from '../controller/votacao.controller'

class VotacaoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de votacao
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(votacaoController.findAll)
            .post(votacaoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(votacaoController.findByID)
            .put(votacaoController.update)
            .delete(votacaoController.delete);
    }

}

export default new VotacaoRoute().router;