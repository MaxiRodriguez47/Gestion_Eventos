const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 

const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/controllers');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. Faltan credenciales VIP.' });
    }

    try {
        const datosUsuario = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_torneos_maxi');
        req.usuario = datosUsuario; 
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o vencido.' });
    }
};


router.get('/', obtenerEventos);

router.post('/', verificarToken, crearEvento);
router.put('/:id', verificarToken, actualizarEvento);
router.delete('/:id', verificarToken, eliminarEvento); 

module.exports = router;