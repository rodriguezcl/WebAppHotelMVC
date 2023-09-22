window.onload = function () {
    listarTipoHabitacion();
}

function listarTipoHabitacion() {
    pintar({
        url: "TipoHabitacion/lista", id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripción"],
        propiedades: ["id", "nombre", "descripcion"],
        editar: true,
        eliminar: true,
        propiedadId:"id"
    })

    

}

function Buscar() {
    var nombretipohabitacion = get("txtnombretipohabitacion")
    pintar({
        url: "TipoHabitacion/filtrarTipohabitacionPorNombre/?nombrehabitacion=" + nombretipohabitacion ,
        id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripción"],
        propiedades: ["id", "nombre", "descripcion"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    })
}

function Limpiar() {
    LimpiarDatos("frmTipoHabitacion")
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
}

function Editar(id) {
    recuperarGenerico("TipoHabitacion/recuperarTipoHabitacion/?id=" + id,
        "frmTipoHabitacion");
}


function Eliminar(id) {
    Confirmacion("Desea eliminar el tipo habitación?", "Confirmar eliminación", function (res) {

        fetchGetText("TipoHabitacion/eliminarTipoHabitacion/?id=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarTipoHabitacion();
            }
        })
    })
}
