const express = require('express');
const routes = express.Router();
const FotoController = require('../controller/foto.controller');
const { route } = require('./cidade.route');

//Rotas raíz
routes.route('/')
    .get(FotoController.find)
    .post(FotoController.create);

//Rotas para elementos identificados
routes.route('/:id([0-9]+)')
    .get(FotoController.findOne)
    .delete(FotoController.delete);

//Rota para comentários
routes.get('/:id([0-9]+)/comentarios', FotoController.getComentarios);

module.exports = routes;