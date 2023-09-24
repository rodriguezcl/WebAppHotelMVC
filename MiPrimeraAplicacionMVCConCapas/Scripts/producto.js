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
        url: "Producto/listarProductoMarca", id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
            "Stock", "Denominacion"],
        name: "listaProducto",
        propiedades: ["iidproducto", "nombreproducto", "nombremarca",
            "precioventa", "stock", "denominacion"]
    },
        {
            busqueda: true,
            url: "Producto/filtrarProductoPorMarca",
            nombreparametro: "iidmarca",
            type: "combobox",
            name: "listaMarca",
            displaymember: "nombreMarca",
            valuemember: "iidMarca",
            button: true,
            id: "cboMarca"

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