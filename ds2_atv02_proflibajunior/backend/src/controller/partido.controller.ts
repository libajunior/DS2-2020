import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PartidoEntity } from "../entity/partido.entity";

class PartidoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const partidos: PartidoEntity[] = await getRepository(PartidoEntity).find();
            res.send(partidos);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const partido = req.body;

        try {

            await getRepository(PartidoEntity).save( partido );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createPartido', partido);

            res.status(201).send(partido);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const partido = await getRepository(PartidoEntity).findOne(id);

            //Se não exnotrar uma partido, devolve erro 404
            if (partido) {
                res.send(partido);    
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
            const partido = await getRepository(PartidoEntity).findOne(id);

            //Se não exnotrar uma partido, devolve erro 404
            if (partido) {
                //Atualizar o registro
                await getRepository(PartidoEntity).update(partido.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = partido.id;

                const updated = await getRepository(PartidoEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updatePartido', updated);
                
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
            const partido = await getRepository(PartidoEntity).findOne(id);

            //Se não exnotrar uma partido, devolve erro 404
            if (partido) {
                //Excluir o registro
                await getRepository(PartidoEntity).delete(partido);

                //Emitir um sinal para o socket cliente
                req.io.emit('deletePartido', partido);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new PartidoController();