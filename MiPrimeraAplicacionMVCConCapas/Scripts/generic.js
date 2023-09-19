function get(id) {
    return document.getElementById(id).value;
}

function Error(texto = "Ocurrió un error") {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
    })
}

function Correcto(texto = "´Realizado Correctamente") {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
    })
}

function Confirmacion(texto = "¿Desea guardar los cambios?", title = "Confirmación", callback) {
    return Swal.fire({
        title: title,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    })
}

function set(id, valor) {
    document.getElementById(id).value = valor;
}

function setByName(id, valor) {
    document.getElementsByName(id)[0].value = valor;
}

var objConfiguracionGlobal;
var objBusquedaGlobal;

function pintar(objConfiguracion, objBusqueda, objFormulario) {

    //URL Absolute 
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + objConfiguracion.url;
    // alert(urlAbsoluta)
    //Controles//accion
    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";
            //Configuracion del Formulario
            if (objFormulario != undefined) {
                if (objFormulario.guardar == undefined)
                    objFormulario.guardar = true;
                if (objFormulario.limpiar == undefined)
                    objFormulario.limpiar = true;
                if (objFormulario.formularioGenerico == undefined)
                    objFormulario.formularioGenerico = true;
                if (objFormulario.callbackGuardar == undefined)
                    objFormulario.callbackGuardar = "GuardarDatos";

                var type = objFormulario.type;
                if (type == "fieldset") {
                    contenido += "<fieldset>";
                    if (objFormulario.legend != undefined) {
                        contenido += "<legend>" + objFormulario.legend + "</legend>"
                    }

                    contenido += construirFormulario(objFormulario)
                    contenido += `
                      ${objFormulario.guardar == true ? `<button class="btn btn-primary" onclick=${objFormulario.formularioGenerico == undefined || objFormulario.formularioGenerico == false ? `${objFormulario.callbackGuardar}()` : 'GuardarGenerico()' }>Aceptar</button>` : ''}
                      ${objFormulario.limpiar == true ? `<button class="btn btn-danger" onclick="Limpiar()">Limpiar</button>` : ''}
                       `
                    contenido += "</fieldset>";
                }

            }

            if (objConfiguracion!=undefined) {
                if (objConfiguracion.editar == undefined)
                    objConfiguracion.editar = false;
                if (objConfiguracion.eliminar == undefined)
                    objConfiguracion.eliminar = false;
                if (objConfiguracion.propiedadId == undefined)
                    objConfiguracion.propiedadId = "id";
                if (objConfiguracion.callbackEliminar == undefined)
                    objConfiguracion.callbackEliminar = "Eliminar";
                if (objConfiguracion.callbackEditar == undefined)
                    objConfiguracion.callbackEditar = "Editar";
                if (objConfiguracion.id == undefined)
                    objConfiguracion.id = "divTabla";
                

                objConfiguracionGlobal = objConfiguracion;
            }

            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined)
                    objBusqueda.placeholder = "Ingrese un valor";
                if (objBusqueda.id == undefined)
                    objBusqueda.id = "txtbusqueda";
                if (objBusqueda.type = undefined)
                    objBusqueda.type = "text";
                if (objBusqueda.btn == undefined)
                    objBusqueda.btn = true;
               
                
                //Asignar los valores
               
                objBusquedaGlobal = objBusqueda;


                contenido += `
                 <div class="input-group mb-3">`

                contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.idBus}"
                            ${objBusqueda.btn == true ? "" : "onkeyup='Buscar()'"}
                            placeholder="${objBusqueda.placeholder}"
                               />`
                if (objBusqueda.btn == true) {
                    contenido += `
                  <button class="btn btn-primary" 
                     onclick="Buscar()"
                      type="button" >
                    Buscar</button>`
                }

                contenido += `
                 </div>
                `
            }

            contenido += "<div id='divContenedor'>";
            contenido += generarTabla(objConfiguracion, res);
            contenido += "<div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;

        })

}

function LimpiarDatos(idFormulario, excepciones = []) {

    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido en el array de excepciones --> no se hace nada
        if (!excepciones.includes(elementos[i].name))
            elementos[i].value = "";
    }
}

function generarTabla(objConfiguracion, res) {
    var contenido = "";
    contenido += "<table class='table'>";
    contenido += "<tr>";
    for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
        contenido += "<th>" + objConfiguracion.cabeceras[j] + "</th>"
    }
    if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {
        contenido += "<th>Operaciones</th>";
    }


    contenido += "</tr>";
    var fila;
    var propiedadActual;
    for (var i = 0; i < res.length; i++) {
        fila = res[i]
        contenido += "<tr>";
        for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
            propiedadActual = objConfiguracion.propiedades[j]
            contenido += "<td>" + fila[propiedadActual] + "</td>";
        }
        ////contenido += "<td>" + fila.id + "</td>";  //fila["id"]
        ////contenido += "<td>" + fila.nombre + "</td>";
        ////contenido += "<td>" + fila.descripcion + "</td>";
        if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {

            contenido += "<td>";
            if (objConfiguracion.editar == true) {
                contenido += `<i class="btn btn-warning" onclick='${objConfiguracion.callbackEditar} (${fila[objConfiguracion.propiedadId]})' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg></i>`
            }
            if (objConfiguracion.eliminar == true) {
                contenido += `<i class="btn btn-danger" onclick='${objConfiguracion.callbackEliminar} (${fila[objConfiguracion.propiedadId]})' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></i>`
            }
            contenido += "</td>";
        }

        contenido += "</tr>";
    }
    contenido += "</table>"
    return contenido;
}

function fetchGet(url, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
        })
        .catch(err => {
            console.log(err);
        })
}

function fetchGetText(url, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.text())
        .then(res => {
            callback(res)
        })
        .catch(err => {
            console.log(err);
        })
}

function fetchPostText(url, frm, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    fetch(url, {
        method: "POST",
        body: frm
    })
        .then(res => res.text())
        .then(res => {
            callback(res)
        })
        .catch(err => {
            console.log(err)
        })

}

function Buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
    //Id del control
    var valor = get(objBus.idBus)
    fetchGet(`${objBus.url}/?${objBus.nomParametro}=` + valor, function (res) {
        var respuesta = generarTabla(objConf, res);
        document.getElementById("divContenedor").innerHTML = respuesta;
    })

    //fetch(`${objBus.url}/?${objBus.nomParametro}=` + valor)
    //    .then(res => res.json())
    //    .then(res => {
    //        var respuesta = generarTabla(objConf, res);
    //        document.getElementById("divContenedor").innerHTML = respuesta;
    //    })


    //pintar({
    //    url: `${objBus.url}/?${objBus.nomParametro}=` + valor,
    //    id: objConf.id,
    //    cabeceras: objConf.cabeceras,
    //    propiedades: objConf.propiedades
    //}, objBus)
}

function recuperarGenerico(url, idFormulario, excepciones = []) {

    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;

    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name
            if (!excepciones.includes(nombreName))
                setByName(nombreName, res[nombreName])
        }
    });
}

function construirFormulario(objFormulario) {
    var type = objFormulario.type;
    var elementos = objFormulario.formulario;

    var contenido = "<div class='mt-3 mb-3'>";
    contenido += `<form id='${objFormulario.id}'  method='POST'>`;

    //FILAS
    var arrayelemento;
    var numeroarrayelemento;
    for (var i = 0; i < elementos.length; i++) {
        arrayelemento = elementos[i];
        numeroarrayelemento = arrayelemento.length;
        contenido += "<div class='row'>";
        for (var j = 0; j < numeroarrayelemento; j++) {
            var hijosArray = arrayelemento[j];
            if (hijosArray.class == undefined) {
                hijosArray.class = "mb-3"
            }
            if (hijosArray.type == undefined) {
                hijosArray.type = "text"
            }
            if (hijosArray.readonly == undefined) {
                hijosArray.readonly = false;
            }
            if (hijosArray.value == undefined) {
                hijosArray.value = "";
            }
            if (hijosArray.label == undefined) {
                hijosArray.label = hijosArray.name;
            }
            if (hijosArray.rows == undefined) {
                hijosArray.rows = "4";
            }
            if (hijosArray.cols == undefined) {
                hijosArray.cols = "50";
            }


            var typeElemento = hijosArray.type;
            contenido += `<div class="${hijosArray.class}">`
            contenido += `<label>${hijosArray.label}</label>`
            if (typeElemento == "text" || typeElemento == "number" || typeElemento == "date") {
                contenido += `<input type="${typeElemento}" class="form-control" name="${hijosArray.name}" value="${hijosArray.value}" ${hijosArray.readonly == true ? "readonly" : ""} />`
            }
            else if (typeElemento == "textarea") {
                contenido += `<textarea name="${hijosArray.name}" class="form-control" rows="${hijosArray.rows}" cols="${hijosArray.cols}">
                ${hijosArray.value}
                </textarea>`
            }

            contenido += `</div>`
        }
        contenido += `</div>`
    }

    contenido += "</form>";

    contenido += "</div>"
    return contenido;
}