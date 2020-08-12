const express = require('express');
const routes = express.Router();
const PessoaController = require('../controller/pessoa.controller');

//Listar todos os registros
routes.get('/pessoas', PessoaController.find);

//Adicionar um item aos registros
routes.post('/pessoas', PessoaController.create);

//Retorna apenas o item com o ID passado por parametro na URI
routes.get('/pessoas/:id', PessoaController.findOne);

//Altera o item com o ID passado por parametro na URI pelo objeto anexado
routes.put('/pessoas/:id', PessoaController.update);

module.exports = routes;