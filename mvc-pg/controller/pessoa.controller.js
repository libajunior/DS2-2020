const pessoaRepository = require('../repository/pessoa.repository');

//Camada Controller
module.exports = {
    
    //Retorna TODOS
    find: (req, res) => {
        pessoaRepository.find()
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },

    //Retorna pelo ID
    findOne:(req, res) => {
        const id = req.params.id;

        pessoaRepository.findOne( id )
            .then((result) => {

                if (result.rows.length > 0){
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }
                
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    
    //Adiciona um registro
    create: (req, res) => {
        const pessoa = req.body;

        pessoaRepository.create( pessoa )
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },

    //Altera um registro
    update:(req, res) => {
        //Pega o conteúdo do corpo da requisição
        const pessoa = req.body;

        //Atribui o ID do item baseado no parametro da URL
        pessoa.id = req.params.id;

        pessoaRepository.update( pessoa )
            .then((result) => {

                if (result.rows.length > 0){
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }
                
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },

    //Remove um registro
    delete:(req, res) => {

        //Pega o ID a ser excluído através da URL
        var id = req.params.id;

        pessoaRepository.delete( id )
            .then((result) => {

                if (result.rowCount > 0){
                    res.status(204).send();
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }
                
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },

}