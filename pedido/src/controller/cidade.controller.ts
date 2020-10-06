import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CidadeEntity } from "../entity/cidade.entity";

class CidadeController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const cidades: CidadeEntity[] = await getRepository(CidadeEntity).find();
            res.send(cidades);

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new CidadeController();