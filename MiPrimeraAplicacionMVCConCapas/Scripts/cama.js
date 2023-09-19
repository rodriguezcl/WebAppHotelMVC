window.onload = function () {
    listarCama();
}

function listarCama() {
    pintar({
        url: "Cama/listarCama",
        id: "divTabla",
        cabeceras: ["Id Cama", "Nombre", "Descripcion"],
        propiedades: ["idcama", "nombre", "descripcion"]
    }, {
        busqueda: true,
        url: "Cama/filtrarCama",
        nomParametro: "nombrecama",
        type: "text",
        btn: false,
        idBus: "txtnombrecama",
        placeholder: "Ingrese un valor"

    }, {
        type: "fieldset",
        legend: "Datos de la Cama",
        formulario: [
            [
                { class: "mb-3 col-md-6", type: "text", label: "Id Cama", name: "id", value: 0, readonly: true },
                { class: "mb-3 col-md-6", type: "text", label: "Nombre Cama", name: "nombre"}
            ],
            [
                { class: "md-12", type: "text", label: "Descripción Cama", name: "descripcion"}
            ]
        ]
    }
    )
}