window.onload = function () {
    listarProductos();
}

function listarProductos() {
    pintar({
        url: "Producto/lista", id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Marca", "Precio", "Stock", "Denominación"],
        propiedades: ["idproducto", "nombreproducto", "nombremarca", "precioventa" ,"stock", "denominacion"]
    })
}

function Busqueda() {
    var nombreproducto = get("txtnombreproducto")
    pintar({
        url: "Producto/filtrarProductoPorNombre/?nombreproducto=" + nombreproducto,
        id: "divTabla",
        cabeceras: ["Id Producto", "Nombre", "Marca", "Precio", "Stock", "Denominación"],
        propiedades: ["idproducto", "nombreproducto", "nombremarca", "precioventa", "stock", "denominacion"]
    })
}