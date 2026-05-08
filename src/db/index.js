const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('¡Conectado a la base de datos de Torneos Relámpagos con éxito! '))
    .catch(err => console.error('Error al conectar a la base de datos:', err.stack));

module.exports = {
    query: (text, params) => pool.query(text, params),
};