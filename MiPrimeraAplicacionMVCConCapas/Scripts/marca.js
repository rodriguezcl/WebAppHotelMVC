window.onload = function () {
    listarMarca();
}


function listarMarca() {
    pintar({
        url: "Marca/listarMarca",
        id: "divTabla",
        cabeceras: ["Id Marca", "Nombre", "Descripcion"],
        propiedades: ["iidMarca", "nombreMarca", "descripcionMarca"]
    })
}