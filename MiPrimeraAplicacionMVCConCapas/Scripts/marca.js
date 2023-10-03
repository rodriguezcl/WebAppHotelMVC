window.onload = function () {
    listarMarca();
}


function listarMarca() {
    pintar(
        {
            url: "Marca/listarMarca",
            id: "divTabla",
            cabeceras: ["Id Marca", "Nombre", "Descripcion"],
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
                        class: "mb-3 col-md-5",
                        label: "Id Marca",
                        name: "iidMarca",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-7",
                        label: "Nombre marca",
                        name: "nombreMarca"
                    }

                ],
                [
                    {
                        class: "col-md-12",
                        type: "text",
                        label: "Descripcion Marca",
                        name: "descripcionMarca"


                    }
                ]
            ]

        }


    )
}