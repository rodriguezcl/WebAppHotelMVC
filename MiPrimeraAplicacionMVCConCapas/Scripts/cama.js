window.onload = function () {
    listarCama();
}

function listarCama() {
    pintar({
        url: "Cama/listarCama",
        id:"divTabla",
        cabeceras: ["Id Cama","Nombre","Descripcion"],
        propiedades: ["idcama", "nombre","descripcion"]
    }, {
        busqueda: true,
        url: "Cama/filtrarCama",
        nomParametro: "nombrecama",
        type: "text",
        btn: false,
        idBus: "txtnombrecama",
        placeholder: "Ingrese un valor"
           
    })
}