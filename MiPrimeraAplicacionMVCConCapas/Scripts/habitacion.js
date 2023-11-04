window.onload = function() {
    listarHabitacion();
}


function listarHabitacion() {
    pintar({
        popup: true,
        editar: true,
        eliminar: true,

        idpopup: "staticBackdrop1",
        sizepopup: "modal-lg",
        url: "Habitacion/listarHabitacionList", id: "divTabla",
        cabeceras: ["Id Habitacion", "Nombre", "Precio Noche", "Numero Personas",
            "Wifi", "Piscina", "Vista al Mar"],
        name: "listaHabitacion",
        propiedades: ["iidhabitacion", "nombre", "precionoche",
            "numeropersonas", "textotienewifi", "textotienepiscina", "textotienevistaalmar"],
        //Modficarlo
        urlEliminar: "Cama/eliminarCama",
        parametroEliminar: "iidhabitacion",
        urlRecuperar: "Producto/recuperarProducto",
        iscallbackeditar: true,
        callbackeditar: function (res) {
            //Cosas adicionales
            document.getElementById("lblTituloForm").innerHTML = "Habitación";
        },
        parametroRecuperar: "iidhabitacion",
        propiedadId: "iidhabitacion"
    },
        //{
        //    busqueda: true,
        //    //filtro
        //    url: "Producto/filtrarProductoPorCategoria",
        //    nombreparametro: "iidcategoria",
        //    type: "combobox",
        //    name: "listaCategoria",
        //    displaymember: "nombre",
        //    valuemember: "iidcategoria",
        //    button: true,
        //    id: "cboCategoriaBusqueda"

        //}
        null
        ,
        {
            type: "popup",
            titulo: "Habitación",
            tituloconfirmacionguardar: "¿Desea guardar?",
            id: "frmHabitacion",
            // limpiarexcepcion: ["iidproducto"],
            urlGuardar: "Habitacion/guardarProducto",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-6",
                        label: "Id Habitación",
                        name: "iidhabitacion",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-6",
                        label: "Nombre Habitación",
                        name: "nombre",
                        classControl: "o max-100 min-3"
                    }
                ],
                [
                    {
                        class: "col-md-4",
                        type: "combobox",
                        label: "Tipo Habitación",
                        datasource: "listaTipoHabitacion",
                        name: "iidtipohabitacion",
                        id: "cboTipoHabitacion",
                        propiedadMostrar: "nombre",
                        propiedadId: "id",
                        classControl: "o"
                    },
                    {
                        class: "col-md-4",
                        type: "combobox",
                        label: "Cama",
                        datasource: "listaCama",
                        name: "iidcama",
                        id: "cboCama",
                        propiedadMostrar: "nombre",
                        propiedadId: "idcama",
                        classControl: "o"
                    },
                    {
                        class: "col-md-4",
                        type: "combobox",
                        label: "Hotel",
                        datasource: "listaHotel",
                        name: "iidhotel",
                        id: "cboHotel",
                        propiedadMostrar: "nombre",
                        propiedadId: "iidhotel",
                        classControl: "o"
                    }
                ],
               
                [
                    {
                        type: "number",
                        class: "mb-3 col-md-4",
                        label: "Precio compra producto",
                        name: "preciocontra",
                        classControl: "o sndc"
                    },
                    {
                        type: "number",
                        class: "mb-3 col-md-4",
                        label: "Precio venta producto",
                        name: "precioventa",
                        classControl: "o sndc"
                    },
                    {
                        type: "number",
                        class: "mb-3 col-md-4",
                        label: "Stock",
                        name: "stock",
                        classControl: "o snc"
                    }

                ]
            ]


        }
    )
}