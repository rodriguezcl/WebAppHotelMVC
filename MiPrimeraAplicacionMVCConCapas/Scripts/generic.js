var combosLlenar = [];
var objConfiguracionGlobal;
var objBusquedaGlobal;
var objFormularioGlobal;

function get(id) {
    return document.getElementById(id).value;
}

function Error(texto = "Ocurrió un error") {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto
    })
}

function Correcto(texto = "Se realizó correctamente") {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
    })
}

function Confirmacion(texto = "¿Desea guardar los cambios?", title = "Confirmación",
    callback) {
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

function setN(id, valor) {
    document.getElementsByName(id)[0].value = valor;
}

function getN(id, valor) {
    return document.getElementsByName(id)[0].value;
}

function setChecked(selector) {
    document.querySelector(selector).checked = true;
}

function pintar(objConfiguracion, objBusqueda, objFormulario) {

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + objConfiguracion.url;

    //Controles//accion
    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";
            //Configuracion del formulario

            if (objConfiguracion != undefined) {
                if (objConfiguracion.editar == undefined)
                    objConfiguracion.editar = false;
                if (objConfiguracion.eliminar == undefined)
                    objConfiguracion.eliminar = false;
                if (objConfiguracion.propiedadId == undefined)
                    objConfiguracion.propiedadId = "id";
                if (objConfiguracion.callbackEliminar == undefined)
                    objConfiguracion.callbackEliminar = "Eliminar";
                if (objConfiguracion.callbackeditar == undefined)
                    objConfiguracion.callbackeditar = "Editar";
                if (objConfiguracion.popup == undefined)
                    objConfiguracion.popup = false;
                if (objConfiguracion.sizepopup == undefined)
                    objConfiguracion.sizepopup = "";
                if (objConfiguracion.recuperarExcepcion == undefined)
                    objConfiguracion.recuperarExcepcion = [];
                if (objConfiguracion.iscallbackeditar == undefined)
                    objConfiguracion.iscallbackeditar = false;

                objConfiguracionGlobal = objConfiguracion;
            }

            if (objFormulario != undefined) {
                objFormularioGlobal = objFormulario;
                if (objFormulario.limpiarExcepcion == undefined)
                    objFormulario.limpiarExcepcion = [];
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
                if (objFormulario.tituloconfirmacionguardar == undefined)
                    objFormulario.tituloconfirmacionguardar = "Desea guardar los cambios "
                var type = objFormulario.type;
                if (type == "fieldset") {
                    contenido += "<fieldset class='container'>";
                    if (objFormulario.legend != undefined) {
                        contenido += "<legend>" + objFormulario.legend + "</legend>"
                    }

                    contenido += construirFormulario(objFormulario)
                    contenido += `
                     ${objFormulario.guardar == true ?
                            `<button class="btn btn-primary"
                          onclick="${(objFormulario.formulariogenerico == undefined
                                || objFormulario.formulariogenerico == false) ? `${objFormulario.callbackGuardar}()`
                                : `GuardarGenerico
                          ('${objFormulario.id}', '${objFormulario.urlGuardar}')`}">
                                Aceptar</button>` :
                            ''}    
                        ${objFormulario.limpiar == true ?
                            `<button class="btn btn-danger"
                                  onclick="${(objFormulario.formulariogenerico == undefined
                                || objFormulario.formulariogenerico == false) ? "Limpiar" :
                                "LimpiarGenerico"}('${objFormulario == undefined ? "" : objFormulario.id}')">
                                   Limpiar</button>`
                            : ''} 
                       `
                    contenido += "</fieldset>";
                }

                else if (type == "popup") {
                    contenido += `
                     <button type="button"  onclick="EditarGenerico(0,'${objFormulario.id}')" class="mb-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#${objConfiguracion.idpopup}">Nuevo</button>
`
                    contenido += `
                    <div class="modal fade" id="${objConfiguracion.idpopup}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog ${objConfiguracion.sizepopup}">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="lbl${objConfiguracion.idpopup}"></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">`;
                    contenido += construirFormulario(objFormulario);
                    contenido += `</div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='btnCerrar${objConfiguracionGlobal.idpopup}' >Cerrar</button>
                                    <button type="button" class="btn btn-primary" onclick="${(objFormulario.formulariogenerico == undefined
                            || objFormulario.formulariogenerico == false) ? `${objFormulario.callbackGuardar}()`
                            : `GuardarGenerico
                          ('${objFormulario.id}', '${objFormulario.urlGuardar}')`}" >Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
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

                var type = objBusqueda.type;

                contenido += `
                 <div class="container input-group mt-3 mb-3">`

                if (type == "text") {
                    contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.id}"
                         ${objBusqueda.button == true ? "" : "onkeyup='Buscar()'"}  
                       placeholder="${objBusqueda.placeholder}"
                               />`
                }

                else if (type == "combobox") {
                    contenido += `
                                 <select class="form-control"

                                 ${objBusqueda.button == true ? "" : "onchange='Buscar()'"}

                                id="${objBusqueda.id}"> </select>
                                `
                }


                if (objBusqueda.button == true) {
                    contenido += `
                  <button class="btn btn-primary" 
                     onclick="Buscar()"
                      type="button" >
                    Buscar</button>`
                }
                contenido += ` </div>`
            }
            contenido += "<div id='divContenedor'>";
            contenido += generarTabla(objConfiguracion, res, objFormulario, true);
            contenido += "</div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;
            if (objBusqueda != null) {
                llenarComboBusqueda(res);
            }

            //Aqui llenamos los combos
            if (combosLlenar.length > 0) {
                var item;
                for (var i = 0; i < combosLlenar.length; i++) {
                    item = combosLlenar[i];
                    llenarCombo(res[item.datasource], item.id, item.propiedadMostrar, item.propiedadId);
                }
            }
        })

}

function llenarComboBusqueda(res) {
    if (objBusquedaGlobal.type == "combobox") {
        var id = objBusquedaGlobal.id;
        var propiedadMostrar = objBusquedaGlobal.displaymember;
        var propiedadId = objBusquedaGlobal.valuemember;
        var name = objBusquedaGlobal.name;
        var data = res[name]
        llenarCombo(data, id, propiedadMostrar, propiedadId);
    }
}

function LimpiarDatos(idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    for (var i = 0; i < elementos.length; i++) {
        if (!excepciones.includes(elementos[i].name))
            elementos[i].value = "";
    }
}

function validarLongitudMaxima(idFormulario) {
    var error = "";
    var control;
    var controles = document.querySelectorAll("#" + idFormulario + " [class*='max-']");
    for (var i = 0; i < controles.length; i++) {
        control = controles[i];
        //["form-control","o","max-40"]
        var arrayClase = control.className.split(" ");
        //max-40
        var claseMax = arrayClase.filter(p => p.includes("max-"))[0];
        //40
        var valorMax = claseMax.replace("max-", "") * 1;
        if (control.value.length > valorMax) {
            error = "El campo " + control.name + " tiene una longitud de " + control.value.length+ " caracteres, no puede ser superior a " + valorMax;
            return error;
        }
    }
    return error;
}

function validarSoloNumerosEnteros(idFormulario) {
    var error = "";
    var control;
    var controles = document.querySelectorAll("#" + idFormulario + " [class*='snc']");
    for (var i = 0; i < controles.length; i++) {
        control = controles[i];
        var valor = control.value;
        var longitud = valor.length;
        for (var j = 0; j < valor.length; j++) {
            var caracter = valor[j];
            if (caracter != "0" && caracter != "1" && caracter != "2" && caracter != "3" && caracter != "4" && caracter != "5" && caracter != "6" && caracter != "7" && caracter != "8" && caracter != "9") {
                error = "El control " + control.name + " solo debe contener números enteros.";
                return error;
            }

        }
        
    }
    return error;
}

function validarLongitudMinima(idFormulario) {
    var error = "";
    var control;
    var controles = document.querySelectorAll("#" + idFormulario + " [class*='min-']");
    for (var i = 0; i < controles.length; i++) {
        control = controles[i];
        //["form-control","o","max-40"]
        var arrayClase = control.className.split(" ");
        //max-40
        var claseMin = arrayClase.filter(p => p.includes("min-"))[0];
        //40
        var valorMin = claseMin.replace("min-", "") * 1;
        if (control.value.length < valorMin) {
            error = "El campo " + control.name + " tiene una longitud de " + control.value.length + " caracteres, no puede ser inferior a " + valorMin;
            return error;
        }
    }
    return error;
}

function validarObligatorios(idFormulario) {
    //No hay error
    var error = "";
    var elementos = document.querySelectorAll("#" + idFormulario + " .o")
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].value == "") {
            error = "Ingrese " + elementos[i].name;
            return error;
        }
    }
    return error;
}

function generarTabla(objConfiguracion, res, objFormulario, primeravez = false) {
    var listaPintar = res;
    if (objConfiguracion != null && objConfiguracion.name != undefined && primeravez == true) {
        var nombrePropiedad = objConfiguracion.name;
        listaPintar = res[nombrePropiedad];
    }
    var contenido = "";
    contenido += "<table class='container table'>";
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
    for (var i = 0; i < listaPintar.length; i++) {
        fila = listaPintar[i]
        contenido += "<tr>";
        for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
            propiedadActual = objConfiguracion.propiedades[j]
            contenido += "<td>" + fila[propiedadActual] + "</td>";
        }

        if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {
            contenido += "<td>";

            if (objConfiguracion.editar == true) {

                contenido += ` <i
             ${objConfiguracion.popup == true ?
                        `data-bs-toggle="modal" data-bs-target="#${objConfiguracion.idpopup}"` : ""}    
              class="btn btn-primary" 
               onclick='${(objFormulario != undefined &&
                        objFormulario.formulariogenerico != undefined &&
                        objFormulario.formulariogenerico == true) ? "EditarGenerico"
                        : objConfiguracion.callbackeditar
                    }(${fila[objConfiguracion.propiedadId]} , 
                     "${objFormulario == undefined ? "" : objFormulario.id} " ) ' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
                </svg></i>`
            }

            if (objConfiguracion.eliminar == true) {
                contenido += `<i class="btn btn-danger" 
                onclick='${(objFormulario != undefined &&
                        objFormulario.formulariogenerico != undefined
                        &&
                        objFormulario.formulariogenerico == true) ? "EliminarGenerico"
                        : objConfiguracion.callbackEliminar
                    }(${fila[objConfiguracion.propiedadId]}) '  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
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

function fetchGet(url, callback) {
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

function fetchPostText(url, frm, callback) {
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

}

function Buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;

    //Id del control
    var valor = get(objBus.id)
    fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
        var rpta = generarTabla(objConf, res, objFormularioGlobal);
        document.getElementById("divContenedor").innerHTML = rpta;
    })

}

function recuperarGenerico(url, idFormulario, excepciones = [], adicional = false) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name
            if (!excepciones.includes(elementos[i].name)) {
                if (elementos[i].type.toUpperCase() == "RADIO") {
                    setChecked("[type='radio'][value='" + res[nombreName] + "']")
                }
                else {
                    setN(nombreName, res[nombreName])
                }
            }
        }
        if (adicional == true) {
            objConfiguracionGlobal.callbackeditar(res);
            /* recuperarEspecifico(res);*/
        }
    });


}

function validarSoloNumeros(e) {
    var codigoAscii = e.keyCode;
    if (codigoAscii<48 || codigoAscii>57) {
        e.preventDefault();
    }
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
            if (hijosArray.id == undefined) {
                hijosArray.id = "cboPrueba";
            }
            if (hijosArray.propiedadMostrar == undefined) {
                hijosArray.propiedadMostrar = "nombre";
            }
            if (hijosArray.propiedadId == undefined) {
                hijosArray.propiedadId = "id";
            }
            if (hijosArray.classControl == undefined) {
                hijosArray.classControl = "";
            }
            var typelemento = hijosArray.type;
            var classControl = hijosArray.classControl;
            contenido += `<div class="${hijosArray.class}">`
            contenido += `<label>${hijosArray.label}</label>`
            if (typelemento == "text" || typelemento == "number" || typelemento == "date") {
                contenido += `  <input type="text" class="form-control ${classControl} "
                       name="${hijosArray.name}" value="${hijosArray.value}"
                   ${hijosArray.readonly == true ? "readonly" : ""}  />`
            }

            else if (typelemento == "textarea") {
                contenido += `  <textarea name="${hijosArray.name}" class="form-control ${classControl}"
                       rows="${hijosArray.rows}" cols="${hijosArray.cols}">
                   ${hijosArray.value}  </textarea>`
            }

            else if (typelemento == "combobox") {
                contenido += `
                            <select name="${hijosArray.name}" id="${hijosArray.id}" class="form-control ${classControl}"></select>
                            `
                combosLlenar.push(hijosArray)
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

    var error = validarObligatorios(idformulario)
    if (error != "") {
        Error(error);
        return;
    }
    var error = validarLongitudMaxima(idformulario)
    if (error != "") {
        Error(error);
        return;
    }
    var error = validarLongitudMinima(idformulario)
    if (error != "") {
        Error(error);
        return;
    }

    Confirmacion("" + objFormularioGlobal.tituloconfirmacionguardar, "Confirmar Datos", function (res) {

        var tipoform = objFormularioGlobal.type;
        var idpopup = objConfiguracionGlobal.idpopup;
        var frmGenerico = document.getElementById(idformulario);
        var frm = new FormData(frmGenerico);
        fetchPostText(urlguardar, frm, function (res) {
            if (res == "1") {

                var objConf = objConfiguracionGlobal;
                var objBus = objBusquedaGlobal;

                //Id del control
                var valor = get(objBus.id);
                if (tipoform == "popup") {
                    document.getElementById("btnCerrar" + objConfiguracionGlobal.idpopup).click();
                }

                fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
                    var rpta = generarTabla(objConf, res, objFormularioGlobal);
                    document.getElementById("divContenedor").innerHTML = rpta;
                })
                LimpiarDatos(idformulario)
            }
        })
    })

}

function EditarGenerico(id, idFormulario) {
    var url = objConfiguracionGlobal.urlRecuperar;
    var nombreparametro = objConfiguracionGlobal.parametroRecuperar
    if (objFormularioGlobal.type == "popup") {
        LimpiarGenerico(objFormularioGlobal.id);
        if (id == 0) {
            document.getElementById("lbl" + objConfiguracionGlobal.idpopup).innerHTML = "Agregar " + objFormularioGlobal.title;
        }
        //Editar
        else {
            document.getElementById("lbl" + objConfiguracionGlobal.idpopup).innerHTML = "Editar " + objFormularioGlobal.title;
            recuperarGenerico(`${url}/?${nombreparametro}=` + id, idFormulario, objConfiguracionGlobal.recuperarExcepcion, objConfiguracionGlobal.iscallbackeditar);
        }
    }
    else {

        recuperarGenerico(`${url}/?${nombreparametro}=` + id, idFormulario, objConfiguracionGlobal.recuperarExcepcion, objConfiguracionGlobal.iscallbackeditar);
    }
}

function EliminarGenerico(id) {
    var url = objConfiguracionGlobal.urlEliminar;
    var nombreparametro = objConfiguracionGlobal.parametroEliminar;
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
    var valor = get(objBus.id)

    Confirmacion("¿Desea eliminar?", "Confirmar eliminación",
        function (res) {

            fetchGetText(`${url}/?${nombreparametro}=` + id,
                function (rpta) {
                    if (rpta == "1") {
                        Correcto("Se eliminó correctamente");
                        fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
                            var rpta = generarTabla(objConf, res, objFormularioGlobal);
                            document.getElementById("divContenedor").innerHTML = rpta;
                        })

                    }
                })
        })
}

function LimpiarGenerico(idFormulario) {
    LimpiarDatos(idFormulario, objFormularioGlobal.limpiarExcepcion)
}

function llenarCombo(data, id, propiedadMostrar, propiedadId, valueDefecto = "") {
    var contenido = ""
    var elemento;
    contenido += "<option value='" + valueDefecto + "'>--Seleccione--</option>"

    for (var j = 0; j < data.length; j++) {
        elemento = data[j];
        contenido +=
            "<option value='" + elemento[propiedadId] + "'>" + elemento[propiedadMostrar] + "</option>"
    }

    contenido += "";
    document.getElementById(id).innerHTML = contenido;
}