export function traerDatos(donde ="usuarios") {
    try {
        const datos = JSON.parse(localStorage.getItem(donde)) || {}
        return {ok: true, datos: datos}
    }
    catch (error) {return { ok: false }}
}

export function guardarDatos(donde, datos) {
    try {
        localStorage.setItem(donde, JSON.stringify(datos))
        return { ok: true }
    }
    catch (error) {return { ok: false }
    }
}
export async function registro(correo, datos) {
    try {
        let usuarios = await traerDatos();
        if(correo in usuarios.datos){
            return { ok: false, error:"Usuario ya esta Registrado"}
        }
        usuarios.datos[correo]=  datos;
        const resultado = guardarDatos("usuarios", usuarios.datos);
        if (!resultado.ok) {
            return { ok: false, error:"Usuario No se pudo guardar"}
        }
        return { ok: true}
    }
    catch(error){
        return { ok: false,  error:"error inesperado: "+error}
    }
}
export async function iniciSesion(correo, password) {
    try {
        let usuarios = await traerDatos();
        if(correo in usuarios.datos && password === usuarios.datos[correo].password){
            guardarDatos("usuarioActivo", usuarios.datos[correo])
            return { ok: true}
        }
        return { ok: false, error:"Credenciales incorrectas"}
        
    }
    catch(error){
        return { ok: false,  error:"error inesperado"+error}
    }
}

export function validarIngreso() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) ;
    if(usuarioActivo === null){
        alert("Volviendo a inicio")
        window.location.href = "index.html";
    } 
    return { ok: true}
}


export function crearActividad(datos) {
    const fechaInicio = datos.fechaInicio.slice(0,10);
    const fechaFin = datos.fechaFin.slice(0,10);
    const horaInicio = datos.fechaInicio.slice(11);
    const horaFin = datos.fechaFin.slice(11);
    let usuario = traerDatos("usuarioActivo")
    if(!usuario.datos.actividades){
        usuario.datos.actividades= [datos];
        guardarDatos("usuarioActivo",usuario.datos)

        const actulizar = guadraActividadesPrincipal(usuario.datos.correo, usuario.datos)
        if (!actulizar.ok){
            return alert("Vamos mal")
        }
        return { ok: true}
    }
    for(let i=0; i<usuario.datos.actividades.length;i++){
        let feInicio = usuario.datos.actividades[i].fechaInicio.slice(0,10)
        let feFin = usuario.datos.actividades[i].fechaFin.slice(0,10)
        let hInicio = usuario.datos.actividades[i].fechaInicio.slice(11)
        let hFin = usuario.datos.actividades[i].fechaFin.slice(11)
        if(fechaInicio === feInicio && horaInicio>hInicio && horaInicio <hFin){
            return{ok:false, error:"Actividad ya programada " + usuario.datos.actividades[i].titulo}
        }

    }
    usuario.datos.actividades.push(datos)
    guardarDatos("usuarioActivo",usuario.datos)
    guadraActividadesPrincipal(usuario.datos.correo, usuario.datos)
    return { ok: true}
}

export async function guadraActividadesPrincipal(correo, datos) {
    try {
        let usuarios = await traerDatos();
        usuarios.datos[correo]=  datos;
        const resultado = guardarDatos("usuarios", usuarios.datos);
        if (!resultado.ok) {
            return { ok: false, error:"Usuario No se pudo guardar"}
        }

        return { ok: true}
    }
    catch(error){

        return { ok: false,  error:"error inesperado: "+error}
    }
}