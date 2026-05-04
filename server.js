const express = require('express');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();
require('./db/index.js'); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/eventos', require('./routes/eventos'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});