
const { response } = require('express')

const usuariosGet = (req = requery, res = response) => {

    const { q, nombre = 'No name', page = 1, limit } = req.query;

    res.json({
        msg: 'get API-controlador',
        q,
        nombre,
        page,
        limit
    });

}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({

        msg: 'Post API',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Put API',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}