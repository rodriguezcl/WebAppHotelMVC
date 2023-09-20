window.onload = function () {
    listarProductos();
}

function listarProductos() {
    pintar({
        url: "Producto/lista", id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
            "Stock", "Denominacion"],
        propiedades: ["iidproducto", "nombreproducto","nombremarca",
            "precioventa", "stock","denominacion"]
    })
}

function Buscar() {
    var nombreproducto = get("txtnombreproducto");
    pintar({
        url: "Producto/filtrarProductoPorNombre/?nombreproducto=" + nombreproducto,
        id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Nombre Marca", "Precio",
            "Stock", "Denominacion"],
        propiedades: ["iidproducto", "nombreproducto", "nombremarca",
            "precioventa", "stock", "denominacion"]
    })
}