const mysql = require('mysql');

const { database } = require('./keys');

const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se ha perdido la conexión con la base de datos.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión con la base de datos ha sido rechazada.');
        }
    }
    if (connection) connection.release();
    console.log('La conexión ha sido exitosa.');
    return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;