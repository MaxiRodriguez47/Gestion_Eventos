const express = require('express');
const cors = require('cors');
const path = require('path'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
require('./db/index.js'); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'maxir@gmail.com' && password === 'Concepcion1') {
        
        const token = jwt.sign(
            { email: email, rol: 'admin' }, 
            process.env.JWT_SECRET || 'Clave_Maxi_Secreta', 
            { expiresIn: '2h' }
        );
        
        res.status(200).json({ token: token, mensaje: 'Login exitoso' });
    } else {
        res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
});

app.use('/api/eventos', require('./routes/eventos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});