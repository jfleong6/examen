import { validarIngreso, traerDatos, crearActividad} from "./config/db.js";
var usuario
function cargarUnaActividad(actividad){
    let contenedor = document.createElement("div")
    let titulo =document.createElement("h2");
    titulo.textContent=actividad.titulo
    let ubicacion =document.createElement("h3");
    ubicacion.textContent=actividad.ubuicacion
    let inico =document.createElement("h5");
    inico.textContent=actividad.fechaInicio
    let fin =document.createElement("h5");
    fin.textContent=actividad.fechaFin
    contenedor.appendChild(titulo);
    contenedor.appendChild(ubicacion);
    contenedor.appendChild(inico);
    contenedor.appendChild(fin);
    document.getElementById("list-actvidades").append(contenedor)
}
function cargarAcvidades(){
    
    usuario = traerDatos("usuarioActivo");
    
    for (let i=0; i<usuario.datos.actividades.length;i++){
        cargarUnaActividad(usuario.datos.actividades[i]);
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    validarIngreso();
    usuario = traerDatos("usuarioActivo");
    document.getElementById("etiqueta-Nombre").textContent = usuario.datos.nombre;
    
    document.getElementById("formulario-nueva-task").addEventListener("submit", (event)=>{
        event.preventDefault();
        const titulo = document.getElementById("input-new-task-titulo").value
        const ubuicacion = document.getElementById("input-new-ubicacion").value
        const fechaInicio = document.getElementById("input-new-fecha-inicio").value
        const fechaFin = document.getElementById("input-new-fecha-fin").value
        const respuesta = crearActividad({
            titulo:titulo,
            ubuicacion:ubuicacion,
            fechaInicio:fechaInicio,
            fechaFin:fechaFin
        })
        if(!respuesta.ok){
            alert("no se puedo guardar actividad")
        }
        cargarUnaActividad({
            titulo:titulo,
            ubuicacion:ubuicacion,
            fechaInicio:fechaInicio,
            fechaFin:fechaFin
        })
        
    })

    cargarAcvidades()
})