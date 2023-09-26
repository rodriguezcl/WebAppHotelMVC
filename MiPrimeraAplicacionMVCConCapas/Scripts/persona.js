window.onload = function () {
    listarPersona();
    listarCombo();
}

function listarPersona() {
    pintar({
        popup: true,
        idpopup: "staticBackdrop",
        url: "Persona/listarPersona", id: "divTabla",
        cabeceras: ["Id", "Nombre Completo", "Sexo", "Tipo Usuario"],
        propiedades: ["iidpersona", "nombreCompleto", "nombreSexo", "nombreTipoUsuario"],
        editar: true,
        eliminar: true,
        propiedadId: "iidpersona"
    })
}

function listarCombo() {
    fetchGet("TipoUsuario/listarTipoUsuario", function (data) {
        llenarCombo(data, "cboTipoUsuario", "nombre", "iidtipousuario")
        llenarCombo(data, "cboTipoUsuarioForm", "nombre", "iidtipousuario")
    })
}

function filtrarPersonaTipoUsuario() {
    var iidtipousuario = get("cboTipoUsuario");
    pintar({
        url: "Persona/filtrarPersona/?iidtipousuario=" + iidtipousuario, id: "divTabla",
        cabeceras: ["Id", "Nombre Completo", "Sexo", "Tipo Usuario"],
        propiedades: ["iidpersona", "nombreCompleto", "nombreSexo", "nombreTipoUsuario"],
        editar: true,
        eliminar: true,
        propiedadId: "iidpersona"
    })
}

function guardarPersona() {
    var frmPersona = document.getElementById("frmPersona");
    var frm = new FormData(frmPersona);
    fetchPostText("Persona/guardarPersona", frm, function (res) {
        if (res == "1") {
            listarTipoHabitacion();
            Limpiar();
        }
    })
}