const fotoRepository = require('../repository/foto.repository');
const usuarioRepository = require('../repository/usuario.repository')

module.exports = {
    find: async (req,res) => {

        //Pega o nome do usuário a partir de seu username
        const usuario = await usuarioRepository.getByUsername( req.username );

        //Existe um usuário com este username?
        if (usuario) {
            
            try {

                //Tenta pegar as fotos deste usuário
                const fotos = await fotoRepository.find( usuario );
                res.send(fotos);

            } catch (error) {
                res.status(500).send(error);
            }

        } else {
            res.status(404).send({message: 'Usuário não foi encontrado'});
        }
    },
    findOne: (req,res)=> {
        const id = req.params.id;

        fotoRepository.findOne( id )
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
    create: (req,res)=> {
        const foto = req.body;

        fotoRepository.create( foto )
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    update: (req,res)=> {
        //Pega o conteúdo do corpo da requisição
        const foto = req.body;

        //Atribui o ID do item baseado no parametro da URL
        foto.id = req.params.id;

        fotoRepository.update( foto )
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
    delete: (req,res)=> {

        //Pega o ID a ser excluído através da URL
        var id = req.params.id;

        fotoRepository.delete( id )
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