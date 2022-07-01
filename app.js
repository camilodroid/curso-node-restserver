// las importaciones propias node van antes de las de terceros
// paquetes de tercero van arriba
require('dotenv').config();

const Server = require('./models/server')

const server = new Server();




server.listen();






