const fotoRepository = require('../repository/foto.repository');
const usuarioRepository = require('../repository/usuario.repository');
const comentarioRepository = require('../repository/comentario.repository');
const curtidaRepository = require('../repository/curtida.repository');

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
    findOne: async (req,res)=> {
        
        /**
         * Dívida técnica para a próxima aula.
         * 
         * TO-DO: Validar se a foto é do usário da URL
         * 
         */

        try {
            //Pega a foto pelo seu ID
            const foto = await fotoRepository.findOne( req.params.id );

            //Existe uma foto com este ID?
            if (foto) {
                res.send(foto);
            } else {
                res.status(404).send({message: 'Foto não foi encontrada'});
            }

        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }               
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
    delete: async (req,res)=> {

        try {
            //Pega a foto pelo seu ID
            const foto = await fotoRepository.findOne( req.params.id );

            //Existe uma foto com este ID?
            if (foto) {
                //Marcar a foto como excluída setando o status como 'N'
                foto.status = 'N';
                
                //Atualiza foto
                await fotoRepository.update(foto);
                res.send({message: 'Foto foi removida'});
            } else {
                res.status(404).send({message: 'Foto não foi encontrada'});
            }

        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }

    },
    getComentarios: async (req,res) => {

        //TO-DO: validar usuario

        try {
            //Pega a foto pelo seu ID
            const foto = await fotoRepository.findOne( req.params.id );

            //Existe uma foto com este ID?
            if (foto) {
                
                //Busca os comentarios da foto
                const comentarios = await comentarioRepository.findByFoto(foto);
                res.send(comentarios);

            } else {
                res.status(404).send({message: 'Foto não foi encontrada'});
            }

            
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }
    },
    getCurtidas: async (req,res) => {

        //TO-DO: validar usuario

        try {
            //Pega a foto pelo seu ID
            const foto = await fotoRepository.findOne( req.params.id );

            //Existe uma foto com este ID?
            if (foto) {
                
                //Busca os curtidas da foto
                const curtidas = await curtidaRepository.findByFoto(foto);
                res.send(curtidas);

            } else {
                res.status(404).send({message: 'Foto não foi encontrada'});
            }

            
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }
    }
}