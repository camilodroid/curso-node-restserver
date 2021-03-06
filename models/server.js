
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la base de datos
        this.conectarDB();


        // Middlewares


        this.middlewares();


        // rutas de mi aplicacion
        this.routes();

    }

    async conectarDB() {

        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors()); // registringir mi api para que solo ciertas paginas web accedan - 
        //es una proteccion de cierta manera a mi servidor

        // Lectura y pareso del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }


    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {

            console.log('Servidor corriendo en el puerto ', this.port)
        });


    }

}

module.exports = Server;