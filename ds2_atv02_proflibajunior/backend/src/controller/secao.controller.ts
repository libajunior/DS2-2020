import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SecaoEntity } from "../entity/secao.entity";

class SecaoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const secoes: SecaoEntity[] = await getRepository(SecaoEntity).find();
            res.send(secoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const secao = req.body;

        try {

            await getRepository(SecaoEntity).save( secao );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createSecao', secao);

            res.status(201).send(secao);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const secao = await getRepository(SecaoEntity).findOne(id);

            //Se não exnotrar uma secao, devolve erro 404
            if (secao) {
                res.send(secao);    
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
            const secao = await getRepository(SecaoEntity).findOne(id);

            //Se não exnotrar uma secao, devolve erro 404
            if (secao) {
                //Atualizar o registro
                await getRepository(SecaoEntity).update(secao.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = secao.id;

                const updated = await getRepository(SecaoEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateSecao', updated);
                
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
            const secao = await getRepository(SecaoEntity).findOne(id);

            //Se não exnotrar uma secao, devolve erro 404
            if (secao) {
                //Excluir o registro
                await getRepository(SecaoEntity).delete(secao);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteSecao', secao);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new SecaoController();