const express = require('express');
const cors = require('cors');
const configdb = require('./configdb');
const taskRouter = require('./routes/taskRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
configdb().then(() => {
    console.log('Conexión a la base de datos establecida');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

// Rutas
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});