import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { VotacaoEntity } from "../entity/votacao.entity";

class VotacaoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const votacoes: VotacaoEntity[] = await getRepository(VotacaoEntity).find();
            res.send(votacoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const votacao = req.body;

        try {

            await getRepository(VotacaoEntity).save( votacao );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createVotacao', votacao);

            res.status(201).send(votacao);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const votacao = await getRepository(VotacaoEntity).findOne(id);

            //Se não exnotrar uma votacao, devolve erro 404
            if (votacao) {
                res.send(votacao);    
            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar o registro pela ID
            const votacao = await getRepository(VotacaoEntity).findOne(id);

            //Se não exnotrar uma votacao, devolve erro 404
            if (votacao) {
                //Atualizar o registro
                await getRepository(VotacaoEntity).update(votacao.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = votacao.id;

                const updated = await getRepository(VotacaoEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateVotacao', updated);
                
                res.send(novo);

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const votacao = await getRepository(VotacaoEntity).findOne(id);

            //Se não exnotrar uma votacao, devolve erro 404
            if (votacao) {
                //Excluir o registro
                await getRepository(VotacaoEntity).delete(votacao);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteVotacao', votacao);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new VotacaoController();