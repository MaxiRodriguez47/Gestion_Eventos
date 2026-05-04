const express = require('express');
const router = express.Router();

const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/controllers');

router.get('/', obtenerEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento); 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('DELETE FROM evento WHERE id = $1', [id]);
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        
        res.json({ message: 'Partido eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;