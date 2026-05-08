CREATE TABLE usuarios(
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 rol VARCHAR(20) DEFAULT 'espectador',
 fecha_registro TIMESTAMP DEFAULT NOW()
); 

CREATE TABLE categorias(
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(100) UNIQUE NOT NULL,
 descripcion TEXT
); 

CREATE TABLE evento(
 id SERIAL PRIMARY KEY,
 titulo VARCHAR(200) NOT NULL,
 id_categoria INT REFERENCES categorias(id),
 fecha TIMESTAMP NOT NULL,
 estadio VARCHAR(100) NOT NULL,
 capacidad_max INT NOT NULL,
 entradas_disp INT CHECK (entradas_disp >=0)
); 

CREATE TABLE reservas (
 id SERIAL PRIMARY KEY,
 id_usuario INT REFERENCES usuarios(id),
 id_evento INT REFERENCES evento(id),
 fecha_reserva TIMESTAMP DEFAULT NOW(),
 estado VARCHAR(20) DEFAULT 'confirmada'
);

INSERT INTO categorias (nombre, descripcion) VALUES
('Torneo Relampago - Fase de Grupos', 'Partidos clasificatorios del fin de semana'),
('Torneo Relampago - Copa de Oro', 'Instancias finales por el campeonato');

INSERT INTO evento (titulo, id_categoria, fecha, estadio, capacidad_max, entradas_disp) VALUES
('Defensores de Villa Nueva vs Pasaje FC',1, '2026-05-10 16:00:00', 'Complejo 1', 150, 150),
('El Rejunte Fc vs Los pibes de la Plaza - Gran final',2, '2026-05-15 20:30:00', 'Predio Municipal', 300, 300);

INSERT INTO usuarios( nombre, email, password_hash, rol) VALUES
('Maxi', 'maxi@gmail.com','ejemplo123', 'admin');