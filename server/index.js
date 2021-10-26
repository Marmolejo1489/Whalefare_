//Dependencias
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const pool = require('./database');

//Inicialización
const app = express();

//Configuración
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use(require('./routes')); 
app.use(require('./routes/sessions')); 
app.use(require('./routes/passwords')); 

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto: ', app.get('port'))
});