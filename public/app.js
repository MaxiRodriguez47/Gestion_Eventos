const urlAPI = '/api/eventos';

// --- REFERENCIAS DE PANTALLAS ---
const pantallaInicio = document.getElementById('pantalla-inicio');
const seccionLogin = document.getElementById('seccion-login');
const seccionRegistro = document.getElementById('seccion-registro');
const appPrincipal = document.getElementById('app-principal');

// --- BOTONES Y FORMULARIOS ---
const btnComenzar = document.getElementById('btn-comenzar');
const btnNavLogin = document.getElementById('btn-nav-login'); 
const btnNavRegistrarse = document.getElementById('btn-nav-registrarse'); 
const formularioLogin = document.getElementById('formulario-login');
const formularioRegistro = document.getElementById('formulario-registro'); 
const btnVolverRegistro = document.getElementById('btn-volver-registro'); 
const btnLogout = document.getElementById('btn-logout');

const vistaFormulario = document.getElementById('vista-formulario');
const vistaCartelera = document.getElementById('vista-cartelera');
const btnIrCargar = document.getElementById('btn-ir-cargar');
const btnVerCartelera = document.getElementById('btn-ver-cartelera');
const contenedorEventos = document.getElementById('contenedor-eventos');
const formulario = document.getElementById('formulario-evento');


// --- EVENTOS DE NAVEGACIÓN ---
btnComenzar.addEventListener('click', () => { pantallaInicio.style.display = 'none'; seccionLogin.style.display = 'flex'; });
btnNavLogin.addEventListener('click', () => { pantallaInicio.style.display = 'none'; seccionLogin.style.display = 'flex'; });
btnNavRegistrarse.addEventListener('click', () => { pantallaInicio.style.display = 'none'; seccionRegistro.style.display = 'flex'; });
btnVolverRegistro.addEventListener('click', () => { seccionRegistro.style.display = 'none'; pantallaInicio.style.display = 'flex'; });

btnIrCargar.addEventListener('click', () => {
    vistaCartelera.style.display = 'none'; vistaFormulario.style.display = 'block';
    btnIrCargar.style.display = 'none'; btnVerCartelera.style.display = 'inline-block';
});
btnVerCartelera.addEventListener('click', () => {
    vistaFormulario.style.display = 'none'; vistaCartelera.style.display = 'block';
    btnVerCartelera.style.display = 'none'; btnIrCargar.style.display = 'inline-block';
    cargarEventos();
});


// --- LÓGICA DE REGISTRO (SIMULACRO) ---
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const emailNuevo = document.getElementById('email_registro').value;
    const passwordNuevo = document.getElementById('password_registro').value;
    
    localStorage.setItem('usuarioTemporal', emailNuevo);
    localStorage.setItem('passwordTemporal', passwordNuevo);

    alert('¡Cuenta creada! (Recordá que es un usuario de prueba, no tiene permisos de administrador)');
    formularioRegistro.reset(); 
    seccionRegistro.style.display = 'none';
    seccionLogin.style.display = 'flex';
});


// --- LÓGICA DE LOGIN REAL ---
formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    try {
        // Le pegamos a la ruta real de tu servidor
        const respuesta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            // ¡EL PASO MÁGICO! Guardamos la credencial VIP
            localStorage.setItem('tokenVIP', data.token);

            seccionLogin.style.display = 'none';
            appPrincipal.style.display = 'block';
            cargarEventos(); 
        } else {
            // Chequeamos si es un usuario del simulacro
            const userGuardado = localStorage.getItem('usuarioTemporal');
            const passGuardada = localStorage.getItem('passwordTemporal');

            if (email === userGuardado && password === passGuardada) {
                alert('Entraste como usuario de prueba. Podés ver la cartelera, pero no tenés la llave VIP para editar.');
                seccionLogin.style.display = 'none';
                appPrincipal.style.display = 'block';
                cargarEventos();
            } else {
                alert('Email o contraseña incorrectos');
            }
        }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
    }
});

// CERRAR SESIÓN
btnLogout.addEventListener('click', () => {
    appPrincipal.style.display = 'none';
    pantallaInicio.style.display = 'flex';
    formularioLogin.reset(); 
    localStorage.removeItem('tokenVIP'); // Destruimos la llave por seguridad
    btnVerCartelera.click(); 
});


// --- PETICIONES AL SERVIDOR CON TOKEN ---
async function cargarEventos() {
    try {
        const respuesta = await fetch(urlAPI);
        const eventos = await respuesta.json();

        contenedorEventos.innerHTML = ''; 
        if(eventos.length === 0){
            contenedorEventos.innerHTML = '<p class="cargando">No hay partidos programados todavia.</p>';
            return;
        } 
        
        eventos.forEach(evento => {
            const fechaFormateada = new Date(evento.fecha).toLocaleString('es-AR');
            const tarjeta = document.createElement('div');
            tarjeta.className ='tarjeta-evento';
            
            tarjeta.innerHTML = `
                <h3>${evento.titulo}</h3>
                <p><strong>Estadio:</strong> ${evento.estadio}</p>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                <p><strong>Entradas Disp:</strong> ${evento.entradas_disp} / ${evento.capacidad_max}</p> 
                <button onclick="eliminarEvento(${evento.id})" class="btn-eliminar">Eliminar</button>
            `;
            contenedorEventos.appendChild(tarjeta);
        });
    } catch (error) {
        contenedorEventos.innerHTML = '<p style="color: red; text-align: center;">Error al conectar al servidor.</p>';
    }   
} 

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const nuevoPartido = {
        titulo: document.getElementById('titulo').value,
        id_categoria: document.getElementById('id_categoria').value || null,
        fecha: document.getElementById('fecha').value,
        estadio: document.getElementById('estadio').value,
        capacidad_max: document.getElementById('capacidad_max').value,
        entradas_disp: document.getElementById('entradas_disp').value, 
    }; 

    // Buscamos la llave guardada
    const token = localStorage.getItem('tokenVIP');

    try {
        const respuesta = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // LE MOSTRAMOS LA LLAVE AL SERVIDOR
            },
            body: JSON.stringify(nuevoPartido)
        }); 
        
        if (respuesta.ok) {
            alert('Partido guardado con éxito');
            formulario.reset();
            btnVerCartelera.click(); 
        } else {
            alert('Permiso denegado. No sos el Administrador.');
        }
    } catch (error) {
        alert('No se pudo conectar con el servidor');
    }
}); 

async function eliminarEvento(id) {
    if (confirm('¿Estás seguro de que querés borrar este partido?')) {
        const token = localStorage.getItem('tokenVIP'); // Buscamos la llave

        try {
            const respuesta = await fetch(`${urlAPI}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // LE MOSTRAMOS LA LLAVE AL SERVIDOR
                }
            });

            if (respuesta.ok) {
                cargarEventos();
            } else {
                alert('Permiso denegado. No sos el Administrador.');
            }
        } catch (error) {
            alert('Error al conectar con el servidor.');
        }
    }
}