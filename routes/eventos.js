const express = require('express');
const router = express.Router();

// Importamos TODAS las funciones del controlador
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/controllers');

// GET: Leer todos los datos
router.get('/', obtenerEventos);

// POST: Crear un dato nuevo
router.post('/', crearEvento);

// PUT: Actualizar un dato existente. Fijate que agregamos /:id en la URL
router.put('/:id', actualizarEvento);

// DELETE: Borrar un dato existente. También necesita el /:id
router.delete('/:id', eliminarEvento);

module.exports = router;