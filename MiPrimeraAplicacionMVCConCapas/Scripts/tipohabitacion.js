window.onload = function () {
    listarTipoHabitacion();
}

function listarTipoHabitacion() {
    pintar({
        url: "TipoHabitacion/lista", id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripcion"],
        propiedades:["id","nombre","descripcion"]})

    

}

function Buscar() {
    var nombretipohabitacion = get("txtnombretipohabitacion")
    pintar({
        url: "TipoHabitacion/filtrarTipohabitacionPorNombre/?nombrehabitacion=" + nombretipohabitacion ,
        id: "divTabla",
        cabeceras: ["Id", "Nombre", "Descripcion"],
        propiedades: ["id", "nombre", "descripcion"]
    })
    //alert(nombretipohabitacion)
}