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
    pintar(
        {
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
            urlRecuperar: "Producto/recuperarProducto",
            //recuperarExcepcion: ["iidproducto"],
            iscallbackeditar: true,
            callbackeditar: function (res) {
                //Cosas adicionales
                document.getElementById("lblTituloForm").innerHTML="Producto"
            },
            parametroRecuperar: "iidproducto",
            propiedadId: "iidproducto"
        },
        {
            busqueda: true,
            //filtro
            url: "Producto/filtrarProductoPorCategoria",
            nombreparametro: "iidCategoria",
            type: "combobox",
            name: "listaCategoria",
            displaymember: "nombreCategoria",
            valuemember: "iidCategoria",
            button: true,
            id: "cboCategoriaBusqueda"

        },
        {
            type: "popup",
            title: "Producto",
            tituloconfirmacionguardar: "Desea guardar el producto?",
            id: "frmProducto",
            //limpiarExcepcion: ["iidproducto"],
            urlGuardar: "Producto/guardarProducto",
            formulario: [
                [
                    {
                        class: "mb-3 col-md-6",
                        label: "Id Producto",
                        name: "iidproducto",
                        value: 0,
                        readonly: true
                    },
                    {
                        class: "mb-3 col-md-6",
                        label: "Nombre Producto",
                        name: "nombreproducto",
                        classControl: "o max-100 min-3"
                    }

                ],
                [
                    {
                        class: "mb-3 col-md-6",
                        type: "combobox",
                        label: "Marca",
                        datasource: "listaMarca",
                        name: "iidmarca",
                        id: "cboMarca",
                        propiedadMostrar: "nombreMarca",
                        propiedadId: "iidMarca",
                        classControl: "o"
                    },
                    {
                        class: "mb-3 col-md-6",
                        type: "combobox",
                        label: "Categoría",
                        datasource: "listaCategoria",
                        name: "iidcategoria",
                        id: "cboCategoria",
                        propiedadMostrar: "nombreCategoria",
                        propiedadId: "iidCategoria",
                        classControl: "o"
                    }
                ],
                [
                    {
                        class: "mb-3 col-md-12",
                        type: "textarea",
                        label: "Descripción Producto",
                        name: "descripcion",
                        rows: "3",
                        cols: "20",
                        classControl: "o"

                    }
                ],
                [
                    {
                        type: "number",
                        class: "mb-3 col-md-4",
                        label: "Precio Compra",
                        name: "preciocompra",
                        classControl: "o"
                    },
                    {
                        type: "number",
                        class: "mb-3 col-md-4",
                        label: "Precio Venta",
                        name: "precioventa",
                        classControl: "o"
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