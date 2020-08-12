const pessoaRepository = require('../repository/pessoa.repository');

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
    update: (req, res) => {
        const pessoa = req.body;

        //Força o ID da URI para ser o id do objeto
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



}