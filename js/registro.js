import { traerDatos, registro } from "./config/db.js";

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("formulario-registro").addEventListener("submit", async (event)=>{
        event.preventDefault();
        const nombreRegistro = document.getElementById("nombre-registro").value
        const emailRegistro = document.getElementById("email-registro").value
        const passwordRegistro = document.getElementById("password-registro").value
        const resultado = await registro(emailRegistro, {
            nombre:nombreRegistro,
            correo: emailRegistro,
            password: passwordRegistro
        })
        if(!resultado.ok){
            return alert("Error: "+ resultado.error);
        }
        alert("Usuario Registrado Correctamente !!!!!")
        document.getElementById("formulario-registro").reset()
    });
})