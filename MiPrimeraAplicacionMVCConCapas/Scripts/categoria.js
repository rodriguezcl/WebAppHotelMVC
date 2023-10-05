window.onload = function () {
    listarCategoria();
}

function listarCategoria() {
    pintar(
        {
            popup: true,
            editar: true,
            eliminar: true,
            idpopup: "staticBackdrop1",
            sizepopup: "modal-lg",
            url: "Categoria/listarCategoria", id: "divTabla",
            cabeceras: ["Id Categoria", "Nombre", "Descripción"],
            propiedades: ["iidCategoria", "nombreCategoria", "descripcionCategoria"],
            urlEliminar: "Categoria/eliminarCategoria",
            parametroEliminar: "iidCategoria",
            urlRecuperar: "Categoria/recuperarCategoria",
            iscallbackeditar: true,
            callbackeditar: function (res) {document.getElementById("lblTituloForm").innerHTML = "Categoria"},
            parametroRecuperar: "iidCategoria",
            propiedadId: "iidCategoria"
        },

        null,
        
        {
            type: "popup",
            title: "Categoria",
            tituloconfirmacionguardar: "Desea guardar la Categoria?",
            id: "frmCategoria",
         
            urlGuardar: "guardarCategoria",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-6",
                        label: "Id Categoria",
                        name: "iidCategoria",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-6",
                        label: "Nombre Categoria",
                        name: "nombreCategoria",
                        classControl: "o max-100 min-2"
                    }

                ],
                [
                    {
                        class: "mb-3 col-md-12",
                        type: "textarea",
                        label: "Descripción Categoria",
                        name: "descripcionCategoria",
                        rows: "3",
                        cols: "20",
                        classControl: "o max-100 min-10"

                    }
                ]
            ]
        }
    )
}
