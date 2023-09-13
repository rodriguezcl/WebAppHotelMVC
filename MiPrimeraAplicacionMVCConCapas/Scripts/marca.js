window.onload = function () {
    listarMarca();
}


function listarMarca() {
    pintar({
        url: "Marca/listarMarca",
        id: "divTabla",
        cabeceras: ["Id Marca", "Nombre", "Descripcion"],
        propiedades: ["iidMarca", "nombreMarca", "descripcionMarca"]
    }, {
        busqueda: true,
        url: "Marca/filtrarMarca",
        nomParametro: "nombremarca",
        type: "text",
        btn: true,
        idBus: "txtnombremarca",
        placeholder: "Ingrese un valor"

    })
}

