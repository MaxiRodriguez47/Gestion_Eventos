const urlAPI = '/api/eventos';
const contenedorEventos = document.getElementById('contenedor-eventos');
const formulario = document.getElementById('formulario-evento');

async function cargarEventos() {
    try{
        const respuesta = await fetch(urlAPI);
        const eventos = await respuesta.json();

        contenedorEventos.innerHTML = ''; 
        if(eventos.length === 0){
            contenedorEventos.innerHTML = '<p class= "cargando">No hay partidos programados todavia.<p>';
            return;
        } 
        eventos.forEach(evento =>{
            const fechaFormateada = new Date(evento.fecha).toLocaleString('es-AR');
            const tarjeta = document.createElement('div');
            tarjeta.className ='tarjeta-evento';
            
            tarjeta.innerHTML = `
                <h3>${evento.titulo}</h3>
                <p><strong>Estadio:</strong> ${evento.estadio}</p>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                <p><strong>Entradas Disp:</strong> ${evento.entradas_disp} / ${evento.capacidad_max}</p>
            `;
           contenedorEventos.appendChild(tarjeta);
        });
    } catch (error) {
        console.error('Error al cargar eventos:' ,error);
        contenedorEventos.innerHTML = '<p style="color: red; text-align: center;">Error al conectar al servidor. <p>';
    }   
} 
formulario.addEventListener('submit' ,async (e) =>{
    e.preventDefault();

    const nuevoPartido ={
        titulo:document.getElementById('titulo').value,
        id_categoria: document.getElementById('id_categoria').value ||null,
        fecha: document.getElementById('fecha').value,
        estadio: document.getElementById('estadio').value,
        capacidad_max: document.getElementById('capacidad_max').value,
        entradas_disp: document.getElementById('entradas_disp').value,
    }; 

    try{
        const respuesta = await fetch(urlAPI,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nuevoPartido)
        }); 
        if(respuesta.ok){
            formulario.reset();
            cargarEventos();
            alert('Partido guardado con exito');
        } else{
            alert ('Error al guardar el partido');
        }
    } catch (error){
        console.error('Error:', error);
        alert ('No se pudo conectar con el servidor');
    }
}); 
document.addEventListener('DOMContentLoaded', cargarEventos);