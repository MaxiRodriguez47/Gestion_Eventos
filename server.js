const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/index.js'); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/eventos', require('./routes/eventos'));

app.get('/', (req, res) => {
    res.send('¡El servidor de los Torneos Relámpagos está vivo!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});