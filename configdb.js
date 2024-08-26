const mongoose = require('mongoose');

const configdb = async () => {
    try {
        // Conecta a la base de datos usando la URI de conexión de MongoDB
        await mongoose.connect('mongodb://localhost:27017/Task_Tracker');
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Termina el proceso si la conexión falla
    }
};

module.exports = configdb;
