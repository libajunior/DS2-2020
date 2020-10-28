import { createConnection } from 'typeorm';
import app from './app';
import socketIO from 'socket.io';
import http from 'http';

createConnection().then(connection => {

    //Levanta o servidor
    app.server.listen(3333, () => {
        console.log('> Running on port 3333...')
    });


}).catch(error => {
    console.log('Não foi possível conecta ao banco de dados.', error.message);
});