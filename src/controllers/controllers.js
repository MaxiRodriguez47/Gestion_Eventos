const db = require('../db/index'); 

// 1. OBTENER partidos (GET)
const obtenerEventos = async (req, res) => {
    try {
        const respuesta = await db.query('SELECT * FROM evento');
        res.json(respuesta.rows);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Hubo un problema al cargar los torneos' });
    }
};

// 2. CREAR un partido (POST)
const crearEvento = async (req, res) => {
    try {
        const { titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp } = req.body;
        const sql = 'INSERT INTO evento (titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const valores = [titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp];
        
        const respuesta = await db.query(sql, valores);
        res.status(201).json(respuesta.rows[0]);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ error: 'Hubo un problema al guardar el partido' });
    }
};

// 3. ACTUALIZAR un partido (PUT)
const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params; // Sacamos el número de ID directamente de la URL
        const { titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp } = req.body;

        const sql = 'UPDATE evento SET titulo = $1, id_categoria = $2, fecha = $3, estadio = $4, capacidad_max = $5, entradas_disp = $6 WHERE id = $7 RETURNING *';
        const valores = [titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp, id];

        const respuesta = await db.query(sql, valores);

        // Si no encontró el partido con ese ID, tiramos un 404
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Partido no encontrado' });
        }

        res.json(respuesta.rows[0]);
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el partido' });
    }
};

// 4. BORRAR un partido (DELETE)
const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM evento WHERE id = $1 RETURNING *';
        const respuesta = await db.query(sql, [id]);

        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Partido no encontrado' });
        }

        res.json({ mensaje: 'Partido eliminado con éxito', evento_borrado: respuesta.rows[0] });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ error: 'Hubo un problema al borrar el partido' });
    }
};

// Exportamos todas las funciones juntas
module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};