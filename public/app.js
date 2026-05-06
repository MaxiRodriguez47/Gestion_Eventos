
const urlAPI = '/api/eventos';

const pantallaInicio = document.getElementById('pantalla-inicio');
const seccionLogin = document.getElementById('seccion-login');
const appPrincipal = document.getElementById('app-principal');
const btnComenzar = document.getElementById('btn-comenzar');
const formularioLogin = document.getElementById('formulario-login');
const btnLogout = document.getElementById('btn-logout');

const vistaFormulario = document.getElementById('vista-formulario');
const vistaCartelera = document.getElementById('vista-cartelera');
const btnIrCargar = document.getElementById('btn-ir-cargar');
const btnVerCartelera = document.getElementById('btn-ver-cartelera');
const contenedorEventos = document.getElementById('contenedor-eventos');
const formulario = document.getElementById('formulario-evento');


btnComenzar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';
    seccionLogin.style.display = 'flex';
});
formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    if (email === 'maxi@gmail.com' && password === 'ejemplo123') {
        seccionLogin.style.display = 'none';
        appPrincipal.style.display = 'block';
        cargarEventos(); 
    } else {
        alert('Credenciales incorrectas');
    }
});

btnLogout.addEventListener('click', () => {
    appPrincipal.style.display = 'none';
    pantallaInicio.style.display = 'flex';
    formularioLogin.reset(); 
    btnVerCartelera.click(); 
});



btnIrCargar.addEventListener('click', () => {
    vistaCartelera.style.display = 'none';
    vistaFormulario.style.display = 'block';
    
    btnIrCargar.style.display = 'none';
    btnVerCartelera.style.display = 'inline-block';
});


btnVerCartelera.addEventListener('click', () => {
    vistaFormulario.style.display = 'none';
    vistaCartelera.style.display = 'block';
    
    btnVerCartelera.style.display = 'none';
    btnIrCargar.style.display = 'inline-block';
    
    cargarEventos();
});



// Cargar Eventos desde el Backend
async function cargarEventos() {
    try {
        const respuesta = await fetch(urlAPI);
        const eventos = await respuesta.json();

        contenedorEventos.innerHTML = ''; 
        if(eventos.length === 0){
            contenedorEventos.innerHTML = '<p class= "cargando">No hay partidos programados todavia.</p>';
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
        console.error('Error al cargar eventos:', error);
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

    try {
        const respuesta = await fetch(urlAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nuevoPartido)
        }); 
        
        if (respuesta.ok) {
            alert('Partido guardado con éxito');
            formulario.reset();
            btnVerCartelera.click(); 
        } else {
            alert('Error al guardar el partido');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor');
    }
}); 

async function eliminarEvento(id) {
    if (confirm('¿Estás seguro de que querés borrar este partido?')) {
        try {
            const respuesta = await fetch(`${urlAPI}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                cargarEventos();
            } else {
                alert('No se pudo eliminar el partido.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor.');
        }
    }
}