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
        llenarCombo(data, "cboTipoUsuario", "nombre", "iidtipousuario","0")
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
            document.getElementById("btnCerrar").click
            listarPersona();
            Limpiar();
        }
    })
}

function Limpiar() {
    LimpiarDatos("frmPersona", ["iidsexo"])
}

function Editar(id) {
    Limpiar();
    //Nuevo
    if (id == 0) {
        document.getElementById("staticBackdropLabel").innerHTML = "Nueva Persona"
    }
    //Editar
    else {
        document.getElementById("staticBackdropLabel").innerHTML = "Editar Persona"
        recuperarGenerico("Persona/recuperarPersona/?iidpersona=" + id, "frmPersona", [], false);
    }
}