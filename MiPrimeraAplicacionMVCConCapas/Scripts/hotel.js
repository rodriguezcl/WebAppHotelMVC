﻿window.onload = function () {
    listarHotel();
}

function listarHotel() {
    pintar(
        {
            popup: true,
            sizepopup: "modal-lg",
            url: "Hotel/listarHotel",
            id: "divTabla",
            cabeceras: ["Id Hotel", "Nombre", "Dirección","Foto Hotel"],
            propiedades: ["iidhotel", "nombre", "direccion","fotobase64"],
            editar: true,
            eliminar: true,
            urlEliminar: "Cama/eliminarCama",
            parametroEliminar: "idcama",
            urlRecuperar: "Cama/recuperarCama",
            parametroRecuperar: "idcamita",
            propiedadId: "iidhotel",
            columnaimg: ["fotobase64"]
        },null
        //{
        //    busqueda: true,
        //    url: "Cama/filtrarCama",
        //    nombreparametro: "nombre",
        //    type: "text",
        //    button: false,
        //    id: "txtnombrecama"

        //}
        ,
        {
            id: "frmHotel",
            type: "popup",
            titulo: "Hotel",
            tituloconfirmacionguardar: "Desea guardar el hotel?",
            urlGuardar: "Hotel/guardarHotel",
            legend: "Datos del Hotel",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-6",
                        label: "Id Hotel",
                        name: "iidhotel",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-6",
                        label: "Nombre Hotel",
                        name: "nombre",
                        classControl: "o max-50 min-3"
                    }

                ],
                [
                    {
                        class: "col-md-6",
                        type: "textarea",
                        label: "Descripción Hotel",
                        name: "descripcion",
                        rows: "5",
                        cols: "20",
                        classControl: "o max-70 min-10"
                    },
                    {
                        class: "col-md-6",
                        type: "textarea",
                        label: "Dirección Hotel",
                        name: "direccion",
                        rows: "5",
                        cols: "20",
                        classControl: "o max-70 min-10"
                    }
                ],
                [
                    {
                        class: "col-md-6",
                        label: "Foto Hotel",
                        type: "file",
                        name: "fotodata",
                        preview: true,
                        imgwidth: 200,
                        imgheight: 200,
                        namefoto: "fotobase64data"
                        
                    }
                ]
            ]

        }
    )
}