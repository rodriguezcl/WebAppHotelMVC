window.onload = function () {
    listarTipoUsuario();
    listarCombo();
}

function listarTipoUsuario() {
    pintar({
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