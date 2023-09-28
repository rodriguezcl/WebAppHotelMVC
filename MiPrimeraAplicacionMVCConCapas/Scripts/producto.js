window.onload = function () {
    listarProductos();
    /* llenarComboMarca();*/
}

function llenarComboMarca() {
    fetchGet("Marca/listarMarca", function (data) {
        llenarCombo(data, "cboMarca", "nombreMarca", "iidMarca")
    })
}

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
            url: "Producto/filtrarProductoPorCategoria",
            nombreparametro: "iidcategoria",
            type: "combobox",
            name: "listaCategoria",
            displaymember: "nombreCategoria",
            valuemember: "iidcategoria",
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
                        datasource: "listaMarca",
                        name: "iidmarca",
                        id: "cboMarca",
                        propiedadMostrar: "nombreMarca",
                        propiedadId: "iidMarca"
                    }
                ]
            ]
        }
    )
}

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