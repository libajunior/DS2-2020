import express from 'express';
import cors from 'cors';
import {createServer, Server} from 'http';
import socketIO from 'socket.io';

import candidatoRoute from './router/candidato.router'
import eleitorRoute from './router/eleitor.router'
import partidoRoute from './router/partido.router'
import secaoRoute from './router/secao.router'
import votacaoRoute from './router/votacao.router'
import zonaRoute from './router/zona.router'

export class App {
    private express: express.Application;
    private io: SocketIO.Server;

    public server: Server;

    constructor() {
        this.express = express();

        this.middleware();
        this.socket();//Somente se utilizar socket
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    //Somente se utilizar socket
    private socket(): void {
        this.server = createServer( this.express );
        this.io = socketIO(this.server);
    }

    private routes(): void {
        //Somente se utilizar socket
        this.express.use((req, res, next) => {
            req.io = this.io;
            
            next();
        });

        this.express.use('/candidatos', candidatoRoute);
        this.express.use('/eleitores', eleitorRoute);
        this.express.use('/partidos', partidoRoute);
        this.express.use('/secoes', secaoRoute);
        this.express.use('/votacoes', votacaoRoute);
        this.express.use('/zonas', zonaRoute);
    }

}

export default new App();