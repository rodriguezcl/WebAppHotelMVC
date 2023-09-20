window.onload = function () {
    listarCama();
}

function listarCama() {
    pintar({
        url: "Cama/listarCama",
        id: "divTabla",
        cabeceras: ["Id Cama", "Nombre", "Descripcion"],
        propiedades: ["idcama", "nombre", "descripcion"],
        editar: true,
        callbackEditar: "EditarCama",
        eliminar: true,
        callbackEliminar: "EliminarCama",
        urlEliminar: "Cama/eliminarCama",
        parametroEliminar: "idcama",
        urlRecuperar: "Cama/recuperarCama",
        parametroRecuperar: "idcamita",
        propiedadId: "idcama"
    }, {
        busqueda: true,
        url: "Cama/filtrarCama",
        nomParametro: "nombrecama",
        type: "text",
        btn: false,
        idBus: "txtnombrecama"

    }, {
        id: "frmCama",
        type: "fieldset",
        /*formularioGenerico: false,*/
        /*callbackGuardar: "GuardarCama",*/
        urlGuardar: "Cama/guardarCama",
        legend: "Datos de la Cama",
        formulario: [
            [
                { class: "mb-3 col-md-6", label: "Id Cama", name: "id", value: 0, readonly: true },
                { class: "mb-3 col-md-6", label: "Nombre Cama", name: "nombre"}
            ],
            [
                { class: "md-12", type: "textarea", label: "Descripción Cama", name: "descripcion", rows:"4", cols:"50"}
            ]
        ]
    }
    )
}