window.onload = function () {
    listarMarca();
}


function listarMarca() {
    pintar({
        url: "Marca/listarMarca",
        id: "divTabla",
        cabeceras: ["Id Marca", "Nombre", "Descripción"],
        propiedades: ["iidMarca", "nombreMarca", "descripcionMarca"],
        editar: true,
        eliminar: true,
        propiedadId: "iidMarca",
        urlEliminar: "Marca/eliminarMarca",
        parametroEliminar: "iidmarca",
        urlRecuperar: "Marca/recuperarMarca",
        parametroRecuperar: "iidmarca"
    },
        {
            busqueda: true,
            url: "Marca/filtrarMarca",
            nombreparametro: "nombremarca",
            type: "text",
            button: false,
            id: "txtnombremarca"
        },
        {
            id: "frmMarca",
            type: "fieldset",
            urlGuardar: "Marca/guardarMarca",
            legend: "Datos de la Marca",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-6",
                        label: "Id Marca",
                        name: "iidMarca",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-6",
                        label: "Nombre Marca",
                        name: "nombreMarca",
                        classControl: "o max-100 min-3"
                    }

                ],
                [
                    {
                        class: "col-md-12",
                        type: "text",
                        label: "Descripcion Marca",
                        name: "descripcionMarca",
                        classControl: "o max-200 min-6"

                    }
                ],
                [
                    {
                        class: "mt-3 col-md-12",
                        label: "Seleccione una Opción",
                        type: "checkbox",
                        labels: ["Excelente Estado", "Buen Estado", "Mal estado", "Pesimo estado (malogrado)"],
                        values: ["1", "2", "3", "4"],
                        //ids: ["rbExcelente", "rbBuen", "rbMal", "rbPes"],
                        name: "iidestado",
                        checked: "rbBuen"
                    }
                ]
            ]

        }


    )
}