const conn = require('../pg-connection');

//Consulta padrão, utilizada em todas os SELECT
const queryDefault = 'select * from seguido';

module.exports = {
    find: async () => {
        const seguidoResult = await conn.query(queryDefault +' order by id');
        return seguidoResult.rows;
    },
    findOne: async (id) => {
        const seguidoResult = await conn.query(queryDefault +' where id = $1', [id]);
        return seguidoResult.rows[0];
    },
    create: async (seguido) => {
        const seguidoResult = await conn.query('insert into seguido(usuario_id, seguido_id) values($1,$2) returning *', 
                                [seguido.usuario.id, seguido.seguido.id]);
        return seguidoResult.rows[0];
    },
    update: async (seguido) => {
        const seguidoResult = await conn.query('update seguido set usuario_id = $1, seguido_id = $2 where id = $3 returning *', 
                [seguido.usuario.id, seguido.seguido.id, seguido.id]);
        return seguidoResult.rows[0];
    },
    delete: async (id) => {
        const seguidoResult = await conn.query('delete from seguido where id = $1', [id]);
        return seguidoResult.rowCount > 0;
    }
};