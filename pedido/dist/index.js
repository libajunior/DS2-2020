"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
typeorm_1.createConnection().then(connection => {
    /*
        //Criar um server e um socket
        const server = http.createServer( app.express );
        const io = socketIO(server);
    
        //Listener
        io.on('connect', socket => {
            console.log('Cliente conectado...');
        });
    
        //Adiciona o sokect em todas as requisições
        app.express.use((req, res, next) => {
            console.log('Entrei aqui')
            req.io = io;
            console.log(req.io);
            next();
        });
    */
    //Levanta o servidor
    app_1.default.server.listen(3333, () => {
        console.log('> Running on port 3333...');
    });
}).catch(error => {
    console.log('Não foi possível conecta ao banco de dados.', error.message);
});
//# sourceMappingURL=index.js.map