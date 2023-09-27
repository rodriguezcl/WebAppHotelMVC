﻿window.onload = function () {
    listarProductos();
    /* llenarComboMarca();*/
}

function llenarComboMarca() {
    fetchGet("Marca/listarMarca", function (data) {
        llenarCombo(data, "cboMarca", "nombreMarca", "iidMarca")
    })
}

//function llenarComboCategoria() {
//    fetchGet("Categoria/listarCategoria", function (data) {
//        llenarCombo(data, "cboCategoria", "nombreCategoria", "iidCategoria")
//    })
//}

function listarProductos() {
    pintar({
        popup: true,
        editar: true,
        eliminar: true,
        idpopup: "staticBackdrop1",
        sizepopup: "modal-lg",
        url: "Producto/listarProductoMarca", id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
            "Stock", "Denominacion"],
        name: "listaProducto",
        propiedades: ["iidproducto", "nombreproducto", "nombremarca",
            "precioventa", "stock", "denominacion"],
        // Para modificar
        urlEliminar: "Cama/eliminarCama",
        parametroEliminar: "idcama",
        urlRecuperar: "Cama/recuperarCama",
        parametroRecuperar: "idcamita",
        propiedadId: "iidproducto"
    },
        {
            busqueda: true,
            //filtro
         /*   url: "Producto/filtrarProductoPorMarca",*/
            //nombreparametro: "iidmarca",
            //type: "combobox",
            //name: "listaMarca",
            //displaymember: "nombreMarca",
            //valuemember: "iidMarca",
            //button: true,
            //id: "cboMarca"

            url: "Producto/filtrarProductoPorCategoria",
            nombreparametro: "iidcategoria",
            type: "combobox",
            name: "listaCategoria",
            displaymember: "nombreCategoria",
            valuemember: "iidCategoria",
            button: true,
            id: "cboCategoria"

        },
        {
            type: "popup",
            id: "frmProducto",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-5",
                        label: "Id Producto",
                        name: "iidproducto",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-7",
                        label: "Nombre Producto",
                        name: "nombreproducto"
                    }

                ],
                [
                    {
                        class: "col-md-12",
                        type: "combobox",
                        label: "Marca",
                        name: "listaMarca",
                        id: "cboMarca",
                        propiedadMostrar: "nombreMarca",
                        propiedadId: "iidMarca"
                    }
                ]
            ]
        }
    )
}

//function listarProductos() {
//    pintar(
//        {
//            popup: true,
//            idpopup: "staticBackdrop1",
//            sizepopup: "modal-lg",
//            url: "Producto/listarProductoCategoria", id: "divTabla",
//            cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
//                "Stock", "Denominacion"],
//            name: "listaProducto",
//            propiedades: ["iidproducto", "nombreproducto", "nombremarca",
//                "precioventa", "stock", "denominacion"],
//            editar: true,
//            eliminar: true,
//            // Para modificar
//            urlEliminar: "Cama/eliminarCama",
//            parametroEliminar: "idcama",
//            urlRecuperar: "Cama/recuperarCama",
//            parametroRecuperar: "idcamita",
//            propiedadId: "iidproducto"
//        },
//        {
//            busqueda: true,

//            url: "Producto/filtrarProductoPorCategoria",
//            nombreparametro: "iidcategoria",
//            type: "combobox",
//            name: "listaCategoria",
//            displaymember: "nombreCategoria",
//            valuemember: "iidCategoria",
//            button: true,
//            id: "cboCategoria"

//        },
//        {
//            type: "popup",
//            id: "frmProducto",
//            formulario: [
//                [
//                    {
//                        class: "mb-3 col-md-5",
//                        label: "Id Producto",
//                        name: "iidproducto",
//                        value: 0,
//                        readonly: true
//                    },
//                    {
//                        class: "mb-3 col-md-7",
//                        label: "Nombre Producto",
//                        name: "nombreproducto"
//                    }

//                ],
//                [
//                    {
//                        class: "col-md-12",
//                        type: "combobox",
//                        label: "Marca",
//                        name: "listaMarca",
//                        id: "cboMarca",
//                        propiedadMostrar: "nombreMarca",
//                        propiedadId: "iidMarca"
//                    }
//                ]
//            ]
//        }
//    )
//}

//function Buscar() {
//    var nombreproducto = get("txtnombreproducto");
//    pintar({
//        url: "Producto/filtrarProductoPorNombre/?nombreproducto=" + nombreproducto,
//        id: "divTabla",
//        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
//            "Stock", "Denominacion"],
//        propiedades: ["iidproducto", "nombreproducto", "nombremarca",
//            "precioventa", "stock", "denominacion"]
//    })
//}

function BuscarProductoMarca() {
    var iidmarca = get("cboMarca")
    pintar({
        url: "Producto/filtrarProductoPorMarca/?iidmarca=" + iidmarca,
        id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio", "Stock", "Denominacion"],
        propiedades: ["iidproducto", "nombreproducto", "nombremarca", "precioventa", "stock", "denominacion"]
    })
}

//function BuscarProductoCategoria() {
//    var iidcategoria = get("cboCategoria")
//    pintar({
//        url: "Producto/filtrarProductoPorCategoria/?iidcategoria=" + iidcategoria,
//        id: "divTabla",
//        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio", "Stock", "Denominacion"],
//        propiedades: ["iidproducto", "nombreproducto", "nombremarca", "precioventa", "stock", "denominacion"]
//    })
//}