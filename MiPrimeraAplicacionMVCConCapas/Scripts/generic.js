function get(id) {
    return document.getElementById(id).value;
}

function Error(texto ="Ocurrio un error") {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto
    })
}

function Correcto(texto="Se realizo correctamente") {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
    })
}

function Confirmacion(texto = "Desea guardar los cambios?", title = "Confirmacion",
callback) {
  return  Swal.fire({
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

function set(id,valor) {
    document.getElementById(id).value = valor;
}

function setN(id, valor) {
    document.getElementsByName(id)[0].value = valor;
}


var objConfiguracionGlobal;
var objBusquedaGlobal;
function pintar(objConfiguracion, objBusqueda,objFormulario) {

    //URL Absolute  https://localhos
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + objConfiguracion.url;
    // alert(urlAbsoluta)
    //Controles//accion
    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";
            //Configuracion del formulario
            if (objFormulario != undefined) {
                if (objFormulario.guardar == undefined)
                    objFormulario.guardar = true
                if (objFormulario.limpiar == undefined)
                    objFormulario.limpiar = true
                if (objFormulario.formulariogenerico == undefined)
                    objFormulario.formulariogenerico = true
                if (objFormulario.callbackGuardar == undefined)
                    objFormulario.callbackGuardar = "GuardarDatos"
                if (objFormulario.id == undefined)
                    objFormulario.id = "frmFormulario"
                var type = objFormulario.type;
                if (type == "fieldset") {
                    contenido += "<fieldset>";
                    if (objFormulario.legend != undefined) {
                        contenido += "<legend>" + objFormulario.legend+"</legend>"
                    }
                    

                    contenido += construirFormulario(objFormulario)
                    contenido += `
                     ${objFormulario.guardar == true ?
                        `<button class="btn btn-primary"
                          onclick="${(objFormulario.formulariogenerico == undefined
                            || objFormulario.formulariogenerico == false) ? `${objFormulario.callbackGuardar}()` 
                                : `GuardarGenerico
                          ('${objFormulario.id}', '${ objFormulario.urlGuardar }')`}">
                                Aceptar</button>` :
                        ''}    
                        ${objFormulario.limpiar == true ? 
                        `<button class="btn btn-danger"
                                  onclick="Limpiar()">
                                   Limpiar</button>`
                        : ''} 
                       `
                    contenido += "</fieldset>";
                }
               
            }

            if (objConfiguracion != undefined) {
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

                objConfiguracionGlobal = objConfiguracion;
            }

            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined)
                    objBusqueda.placeholder = "Ingrese un valor"
                if (objBusqueda.id == undefined)
                    objBusqueda.id = "txtbusqueda"
                if (objBusqueda.type == undefined)
                    objBusqueda.type = "text"
                if (objConfiguracion.id == undefined)
                    objConfiguracion.id = "divTabla";
                if (objBusqueda.button == undefined)
                    objBusqueda.button = true;
               
                //Asignar los valores
         
                objBusquedaGlobal = objBusqueda;
             
                contenido += `
                 <div class="input-group mb-3">`

                contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.id}"
                         ${objBusqueda.button == true ? "" : "onkeyup='Buscar()'"}  
                       placeholder="${objBusqueda.placeholder}"
                               />`
                if (objBusqueda.button == true) {
                    contenido += `
                  <button class="btn btn-primary" 
                     onclick="Buscar()"
                      type="button" >
                    Buscar</button>`
                }
           
                contenido +=  ` </div>`
            }
            contenido += "<div id='divContenedor'>";
            contenido += generarTabla(objConfiguracion, res);
            contenido += "</div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;

        })

}

function LimpiarDatos(idFormulario,excepciones=[]) {
    var elementos = document.querySelectorAll("#"+idFormulario+" [name]")
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido no se hace nada

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
                contenido += ` <i class="btn btn-primary" 
               onclick='${objConfiguracion.callbackEditar}(${fila[objConfiguracion.propiedadId]})' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
                </svg></i>`
            }

            if (objConfiguracion.eliminar == true) {
                contenido += `<i class="btn btn-danger" 
                onclick='${objConfiguracion.callbackEliminar}(${fila[objConfiguracion.propiedadId]})'  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                       </svg></i>`
            }

            contenido += "</td>";

        }
     
        contenido += "</tr>";
    }
    contenido += "</table>"
    return contenido;
}

function fetchGet(url,callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })

}

function fetchGetText(url, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.text())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })

}

function fetchPostText(url,frm, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(url, {
        method: "POST",
        body: frm
    }).then(res => res.text())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })
    /*
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })
        */
}

function Buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
    //Id del control
    var valor = get(objBus.id)
    fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
        var rpta = generarTabla(objConf, res);
        document.getElementById("divContenedor").innerHTML = rpta;
    })
    /*
    fetch(`${objBus.url}/?${objBus.nombreparametro}=` + valor)
        .then(res => res.json())
        .then(res => {
            var rpta = generarTabla(objConf, res);
            document.getElementById("divContenedor").innerHTML = rpta;
        })
        */
    /*
    pintar({
        url: `${objBus.url}/?${objBus.nombreparametro}=` + valor,
        id: objConf.id,
        cabeceras: objConf.cabeceras,
        propiedades: objConf.propiedades
    }, objBus)*/
}


function recuperarGenerico(url,idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name
            if (!excepciones.includes(elementos[i].name))
                setN(nombreName, res[nombreName])
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
            var hijosArray = arrayelemento[j]
            if (hijosArray.class == undefined) {
                hijosArray.class = "mb-3";
            }
            if (hijosArray.type == undefined) {
                hijosArray.type = "text";
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
            if (hijosArray.cols == undefined) {
                hijosArray.cols = "50";
            }
            if (hijosArray.rows == undefined) {
                hijosArray.rows = "10";
            }
            var typelemento = hijosArray.type;
            contenido += `<div class="${hijosArray.class}">`
            contenido += `<label>${hijosArray.label}</label>`
            if (typelemento == "text" || typelemento == "number" || typelemento == "date") {
                contenido += `  <input type="${typelemento}" class="form-control"
                       name="${hijosArray.name}" value="${hijosArray.value}"
                   ${hijosArray.readonly == true ? "readonly" : ""}  />`
            } else if (typelemento == "textarea") {
                contenido += `<textarea name="${hijosArray.name}" 
                     class="form-control"
                     rows="${hijosArray.rows}" cols="${hijosArray.cols}"
                       >${hijosArray.value}</textarea>`

            }
            contenido += `</div>`

        }

        contenido += "</div>";

    }
    contenido += "</form>";
    contenido += "</div>"
    return contenido;
}

function GuardarGenerico(idformulario, urlguardar) {
   // alert(idformulario);
   // alert(urlguardar);
    var frmGenerico = document.getElementById(idformulario);
    var frm = new FormData(frmGenerico);
    fetchPostText(urlguardar, frm, function (res) {
        if (res == "1") {

            var objConf = objConfiguracionGlobal;
            var objBus = objBusquedaGlobal;
            //Id del control
            var valor = get(objBus.id)
            fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
                var rpta = generarTabla(objConf, res);
                document.getElementById("divContenedor").innerHTML = rpta;
            })
            LimpiarDatos(idformulario)
            
        }
    })
}