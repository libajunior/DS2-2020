import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EleitorEntity } from "../entity/eleitor.entity";

class EleitorController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const eleitores: EleitorEntity[] = await getRepository(EleitorEntity).find();
            res.send(eleitores);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const eleitor = req.body;

        try {

            await getRepository(EleitorEntity).save( eleitor );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createEleitor', eleitor);

            res.status(201).send(eleitor);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const eleitor = await getRepository(EleitorEntity).findOne(id);

            //Se não exnotrar uma eleitor, devolve erro 404
            if (eleitor) {
                res.send(eleitor);    
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
            const eleitor = await getRepository(EleitorEntity).findOne(id);

            //Se não exnotrar uma eleitor, devolve erro 404
            if (eleitor) {
                //Atualizar o registro
                await getRepository(EleitorEntity).update(eleitor.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = eleitor.id;

                const updated = await getRepository(EleitorEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateEleitor', updated);
                
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
            const eleitor = await getRepository(EleitorEntity).findOne(id);

            //Se não exnotrar uma eleitor, devolve erro 404
            if (eleitor) {
                //Excluir o registro
                await getRepository(EleitorEntity).delete(eleitor);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteEleitor', eleitor);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new EleitorController();