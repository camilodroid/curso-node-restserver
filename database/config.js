
const mongoose = require('mongoose');


/// conexion a la base de datos
const dbConnection = async () => {

    try {


        await mongoose.connect(process.env.MONGODB_ATLAS, {

            useNewUrlParser: true,
            useUnifiedTopology: true,


        })

        console.log('Base de datos online');

    } catch (error) {

        console.log(error)
        throw new Error('Error a la hoa de iniciar la base de datos');
    }

}


module.exports = {
    dbConnection
}