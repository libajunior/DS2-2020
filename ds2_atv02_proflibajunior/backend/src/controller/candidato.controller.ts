import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CandidatoEntity } from "../entity/candidato.entity";

class CandidatoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const candidatos: CandidatoEntity[] = await getRepository(CandidatoEntity).find();
            res.send(candidatos);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const candidato = req.body;

        try {

            await getRepository(CandidatoEntity).save( candidato );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createCandidato', candidato);

            res.status(201).send(candidato);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const candidato = await getRepository(CandidatoEntity).findOne(id);

            //Se não exnotrar uma candidato, devolve erro 404
            if (candidato) {
                res.send(candidato);    
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
            const candidato = await getRepository(CandidatoEntity).findOne(id);

            //Se não exnotrar uma candidato, devolve erro 404
            if (candidato) {
                //Atualizar o registro
                await getRepository(CandidatoEntity).update(candidato.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = candidato.id;

                const updated = await getRepository(CandidatoEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateCandidato', updated);
                
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
            const candidato = await getRepository(CandidatoEntity).findOne(id);

            //Se não exnotrar uma candidato, devolve erro 404
            if (candidato) {
                //Excluir o registro
                await getRepository(CandidatoEntity).delete(candidato);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteCandidato', candidato);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new CandidatoController();