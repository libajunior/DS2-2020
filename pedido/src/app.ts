import express from 'express';
import cors from 'cors';

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
        console.log('-> Routes')
    }

}

export default new App().express;