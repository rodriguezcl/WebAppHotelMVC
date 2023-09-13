function get(id) {
    return document.getElementById(id).value;
}

var objConfiguracionGlobal;
var objBusquedaGlobal;
function pintar(objConfiguracion,objBusqueda) {

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
            if (objBusqueda!=undefined &&  objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined)
                    objBusqueda.placeholder = "Ingrese un valor";
                if (objBusqueda.id == undefined)
                    objBusqueda.id = "txtbusqueda";
                if (objBusqueda.type = undefined)
                    objBusqueda.type = "text";
                if (objConfiguracion.id == undefined)
                    objConfiguracion.id = "divTabla";
                if (objBusqueda.btn == undefined)
                    objBusqueda.btn = true;
                //Asignar los valores
                objConfiguracionGlobal = objConfiguracion;
                objBusquedaGlobal = objBusqueda;

                contenido += `
                 <div class="input-group mb-3">`

                contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.idBus}"
                            ${objBusqueda.btn == true ? "" : "onkeyup='Buscar()'" }
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

function generarTabla(objConfiguracion,res) {
    var contenido = "";
    contenido += "<table class='table'>";
    contenido += "<tr>";
    for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
        contenido += "<th>" + objConfiguracion.cabeceras[j] + "</th>"
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

function Buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
    //Id del control
    var valor = get(objBus.idBus)
    fetchGet(`${objBus.url}/?${objBus.nomParametro}=` + valor, function (res){
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