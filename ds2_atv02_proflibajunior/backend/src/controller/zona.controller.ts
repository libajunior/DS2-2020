import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ZonaEntity } from "../entity/zona.entity";

class ZonaController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const zonas: ZonaEntity[] = await getRepository(ZonaEntity).find();
            res.send(zonas);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const zona = req.body;

        try {

            await getRepository(ZonaEntity).save( zona );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createZona', zona);

            res.status(201).send(zona);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const zona = await getRepository(ZonaEntity).findOne(id);

            //Se não exnotrar uma zona, devolve erro 404
            if (zona) {
                res.send(zona);    
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
            const zona = await getRepository(ZonaEntity).findOne(id);

            //Se não exnotrar uma zona, devolve erro 404
            if (zona) {
                //Atualizar o registro
                await getRepository(ZonaEntity).update(zona.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = zona.id;

                const updated = await getRepository(ZonaEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateZona', updated);
                
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
            const zona = await getRepository(ZonaEntity).findOne(id);

            //Se não exnotrar uma zona, devolve erro 404
            if (zona) {
                //Excluir o registro
                await getRepository(ZonaEntity).delete(zona);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteZona', zona);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new ZonaController();