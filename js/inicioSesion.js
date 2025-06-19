import { iniciSesion, guardarDatos} from "./config/db.js";

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("formulario-inicio-sesion").addEventListener("submit", async (event)=>{
        event.preventDefault();
        const emailInicioSesion = document.getElementById("email-inicio-sesion").value
        const passwordInicioSesion = document.getElementById("password-inicio-sesion").value
        const resultado = await iniciSesion(emailInicioSesion, passwordInicioSesion)
        if(!resultado.ok){
            return alert("Error: "+ resultado.error);
        }
        alert("Inicion de sesion exitosa!!!!!");
        document.getElementById("formulario-inicio-sesion").reset()
        window.location.href= "home.html";
    });
})