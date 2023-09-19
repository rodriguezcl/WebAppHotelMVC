window.onload = function () {
    listarMarca();
}


function listarMarca() {
    pintar({
        url: "Marca/listarMarca",
        id: "divTabla",
        cabeceras: ["Id Marca", "Nombre", "Descripcion"],
        propiedades: ["iidMarca", "nombreMarca", "descripcionMarca"]
    }, {
        busqueda: true,
        url: "Marca/filtrarMarca",
        nomParametro: "nombremarca",
        type: "text",
        btn: true,
        idBus: "txtnombremarca",
        placeholder: "Ingrese un valor"

    })
}


function Buscar() {
    var nombretipohabitacion = get("txtnombretipohabitacion")
    pintar({
        url: "TipoHabitacion/filtrarTipohabitacionPorNombre/?nombrehabitacion=" + nombretipohabitacion,
        id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripcion"],
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
    recuperarGenerico("TipoHabitacion/recuperarTipoHabitacion/?id=" + id, "frmTipoHabitacion");
}

function Eliminar(id) {
    Confirmacion("Desea eliminar el tipo habitación?", "Confirmar eliminación", function (res) {
        fetchGetText("TipoHabitacion/eliminarTipoHabitacion/?id=" + id, function (respuesta) {
            if (respuesta == "1") {
                Correcto("Se eliminó correctamente");
                listarTipoHabitacion();
            }
        })
    })

}

