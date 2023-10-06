window.onload = function () {
    listarCama();
}

function listarCama() {
    pintar(
        {
            url: "Cama/listarCama",
            id: "divTabla",
            cabeceras: ["Id Cama", "Nombre", "Descripcion"],
            propiedades: ["idcama", "nombre", "descripcion"],
            editar: true,
            eliminar: true,
            urlEliminar: "Cama/eliminarCama",
            parametroEliminar: "idcama",
            urlRecuperar: "Cama/recuperarCama",
            parametroRecuperar: "idcamita",
            propiedadId: "idcama"
        },
        {
            busqueda: true,
            url: "Cama/filtrarCama",
            nombreparametro: "nombre",
            type: "text",
            button: false,
            id: "txtnombrecama"

        },
        {
            id: "frmCama",
            type: "fieldset",
            urlGuardar: "Cama/guardarCama",
            legend: "Datos de la Cama",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-5",
                        label: "Id Cama",
                        name: "idcama",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-7",
                        label: "Nombre cama",
                        name: "nombre",
                        classControl: "o max-50 min-3"
                    }

                ],
                [
                    {
                        class: "col-md-12",
                        type: "textarea",
                        label: "Descripcion Cama",
                        name: "descripcion",
                        rows: "5",
                        cols: "20",
                        classControl: "o max-70 min-10"
                    }
                ],
                [
                    {
                        label: "Seleccione una opción",
                        class: "col-md-12",
                        type: "radio",
                        labels: ["Excelente estado", "Buen estado"],
                        values: ["1", "2"],
                        name: "iidestado",
                        ids: ["rbExcelente", "rbBueno"],
                        checked: "rbExcelente"

                    }
                ]
            ]

        }
    )
}