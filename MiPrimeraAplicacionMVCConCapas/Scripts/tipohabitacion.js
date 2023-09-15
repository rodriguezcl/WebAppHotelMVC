window.onload = function () {
    listarTipoHabitacion();
}

function listarTipoHabitacion() {
    pintar({
        url: "TipoHabitacion/lista", id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripcion"],
        propiedades: ["id", "nombre", "descripcion"],
        editar: true,
        eliminar: true
    })
}




function Buscar() {
    var nombretipohabitacion = get("txtnombretipohabitacion")
    pintar({
        url: "TipoHabitacion/filtrarTipohabitacionPorNombre/?nombrehabitacion=" + nombretipohabitacion,
        id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripcion"],
        propiedades: ["id", "nombre", "descripcion"]
    })
}

function Limpiar() {
    //setByName("id", "")
    //setByName("nombre", "")
    //setByName("descripcion", "")

    //var elementos = document.querySelectorAll("#frmTipoHabitacion [name]")
    //for (var i = 0; i < elementos.length; i++) {
    //    elementos[i].value = "";
    //}

    LimpiarDatos("frmTipoHabitacion", ["id"])
//    Correcto("Funcionó mi alerta")
}

function GuardarDatos() {
    var frmTipoHabitacion = document.getElementById("frmTipoHabitacion");
    var frm = new FormData(frmTipoHabitacion);

    fetchPostText("TipoHabitacion/guardarDatos", frm, function (res) {
        if (res == "1") {
            listarTipoHabitacion();
            Limpiar();
        }
    })
    //fetch("TipoHabitacion/guardarDatos", {
    //    method: "POST",
    //    body: frm
    //})
    //    .then(res => res.text())
    //    .then(res => {
    //        if (res == "1") {
    //            listarTipoHabitacion();
    //        }
    //    });

}