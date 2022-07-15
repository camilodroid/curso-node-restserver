
const { response, request } = require('express');
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario')




const usuariosGet = async (req = request, res = response) => {

    /*
    await es un codigo bloqueante 
    */

    const { limit = 5, desde = 0 } = req.query;

    const query = { estado: true };


    // coleccion de las dos promesas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), // registrar cuantos registros tengo en la base de datos

        Usuario.find(query) // buscar
            .skip(Number(desde)) // desde  para mostrar usuarios
            .limit(Number(limit)), // limite para mostrar los usuarios



    ])

    res.json({
        total,
        usuarios

    })


}

const usuariosPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    // graba la informacion en la base de datos
    await usuario.save();



    res.json(usuario);


}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { id_, password, google, correo, ...resto } = req.body;

    // TODO VALIDAR CONTRA BASE DE DATOS

    if (password) {

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    // buscalo por el id y lo actualizo, ademas lo almacena en el la variable usuario
    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'Put API',
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API'
    })
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    // fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}