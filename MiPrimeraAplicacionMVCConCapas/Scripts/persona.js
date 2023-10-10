window.onload = function () {
    listarPersona();
    listarCombo();
    previewImagen();

}

function previewImagen() {
    var fubFoto = document.getElementById("fupFoto");
    var imgFoto = document.getElementById("imgFoto");
    fubFoto.onchange = function () {
        var file = fubFoto.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById("imgFoto").src = reader.result;
        }
        reader.readAsDataURL(file);
    }
}

function listarPersona() {
    pintar({
        popup: true,
        idpopup:"staticBackdrop",
        url: "Persona/listarPersona", id: "divTabla",
        cabeceras: ["Id Persona", "Nombre Completo", "Sexo","Tipo Usuario"],
        propiedades: ["iidpersona", "nombreCompleto", "nombreSexo",
        "nombreTipoUsuario"],
        editar: true,
        eliminar: true,
        propiedadId: "iidpersona"
    })
}

function listarCombo() {
    fetchGet("TipoUsuario/listarTipoUsuario", function (data) {
        llenarCombo(data, "cboTipoUsuario", "nombre", "iidtipousuario","0")
        llenarCombo(data, "cboTipousuarioForm", "nombre", "iidtipousuario")
    })
}

function filtrarPersonaTipousuario() {
    var iidtipousuario = get("cboTipoUsuario");
    pintar({
        url: "Persona/filtrarPersona/?iidtipousuario="+iidtipousuario, id: "divTabla",
        cabeceras: ["Id Persona", "Nombre Completo", "Sexo", "Tipo Usuario"],
        propiedades: ["iidpersona", "nombreCompleto", "nombreSexo",
            "nombreTipoUsuario"],
        editar: true,
        eliminar: true,
        propiedadId: "iidpersona"
    })
}


function Editar(id) {
    Limpiar();
    //NUevo
    if (id == 0) {
        document.getElementById("staticBackdropLabel").innerHTML = "Nueva persona";
    }
    //editar
    else {
        document.getElementById("staticBackdropLabel").innerHTML = "Editar persona";
        recuperarGenericoEspecifico("Persona/recuperarPersona/?iidpersona=" + id,
            "frmPersona", [], false);
    }
  
}

function Guardar() {

    var error = ValidarObligatorios("frmPersona")
    if (error != "") {
        Error(error);
        return;
    }
    var error=  validarSoloNumerosEnteros("frmPersona")
    if (error != "") {
        Error(error);
        return;
    }
    var frmPersona = document.getElementById("frmPersona");
    var frm = new FormData(frmPersona);
    fetchPostText("Persona/Guardar", frm, function (res) {
        if (res == "1") {
    
            document.getElementById("btnCerrar").click();
            listarPersona();
            Limpiar();
        }
    })
}


function Limpiar() {
    LimpiarDatos("frmPersona", ["iidsexo"])
}

function Eliminar(id) {
    Confirmacion("Desea eliminar la persona?", "Confirmar eliminaciòn", function (res) {

        fetchGetText("Persona/eliminarPersona/?iidpersona=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarPersona();
            }
        })
    })
}