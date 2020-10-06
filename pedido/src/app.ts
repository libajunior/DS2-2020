import express from 'express';
import cors from 'cors';

import cidadeRoute from './router/cidade.route'

export class App {
    public express: express.Application;

    constructor(){
        this.express = express();

        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void {
        this.express.use('/cidades', cidadeRoute);
    }

}

export default new App().express;