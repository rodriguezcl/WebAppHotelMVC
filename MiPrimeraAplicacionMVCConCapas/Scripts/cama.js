window.onload = function () {
    listarCama();
}

function listarCama() {
    pintar({
        url: "Cama/listarCama",
        id:"divTabla",
        cabeceras: ["Id Cama","Nombre","Descripcion"],
        propiedades: ["idcama", "nombre", "descripcion"],
        editar: true,
        eliminar: true,
        urlEliminar: "Cama/eliminarCama",
        parametroEliminar: "idcama",
        urlRecuperar: "Cama/recuperarCama",
        parametroRecuperar:"idcamita",
        propiedadId:"idcama"
    }, {
            busqueda: true,
            url: "Cama/filtrarCama",
            nombreparametro:"nombre",
            type: "text",
            button:false,
            id: "txtnombrecama"
           
    }, {
            id:"frmCama",
            type: "fieldset",
            urlGuardar:"Cama/guardarCama",
            legend:"Datos de la Cama",
            formulario: [
            [
                    {
                    class: "mb-3 col-md-5",
                    label: "Id Cama",
                    name: "id",
                    value: 0,
                    readonly: true
                    },
                    {
                        class: "mb-3 col-md-7",
                        label: "Nombre cama",
                        name: "nombre"
                    }

            ],
            [
                {
                    class: "col-md-12",
                    type: "textarea",
                    label: "Descripcion Cama",
                    name: "descripcion",
                    rows:"5",
                    cols:"20"
                    
                }
            ]
              ]

    })
}