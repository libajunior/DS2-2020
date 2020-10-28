import express from 'express';
import cors from 'cors';
import {createServer, Server} from 'http';
import socketIO from 'socket.io';

import cidadeRoute from './router/cidade.route'
import clienteRoute from './router/cliente.route'
import pedidoRoute from './router/pedido.route'
import produtoRoute from './router/produto.route'
import tabelaprecoRoute from './router/tabelapreco.route'

export class App {
    private express: express.Application;
    private io: SocketIO.Server;

    public server: Server;

    constructor() {
        this.express = express();

        this.middleware();
        this.socket();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private socket(): void {
        this.server = createServer( this.express );
        this.io = socketIO(this.server);
    }

    private routes(): void {
        this.express.use((req, res, next) => {
            req.io = this.io;
            
            next();
        });

        this.express.use('/cidades', cidadeRoute);
        this.express.use('/clientes', clienteRoute);
        this.express.use('/pedidos', pedidoRoute);
        this.express.use('/produtos', produtoRoute);
        this.express.use('/tabelasprecos', tabelaprecoRoute);
    }

}

export default new App();