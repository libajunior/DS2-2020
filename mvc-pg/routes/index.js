const express = require('express');
const routes = new express.Router();

//Importa as rotas da aplicação
const cidadeRoute = require('./cidade.route');
const pessoaRoute = require('./pessoa.route');
const usuarioRoute = require('./usuario.route');

const fotoRoute = require('./foto.route');
const curtidaRoute = require('./curtida.route');
const comentarioRoute = require('./comentario.route');
const { route } = require('./cidade.route');

routes.use('/cidades', cidadeRoute);
routes.use('/pessoas', pessoaRoute);
routes.use('/account', usuarioRoute);

routes.use('/fotos', fotoRoute);
routes.use('/curtidas', curtidaRoute);
routes.use('/comentarios', comentarioRoute);

module.exports = routes;