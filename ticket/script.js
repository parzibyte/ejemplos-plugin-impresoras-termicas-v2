const $estado = document.querySelector("#estado"),
    $listaDeImpresoras = document.querySelector("#listaDeImpresoras"),
    $btnLimpiarLog = document.querySelector("#btnLimpiarLog"),
    $btnImprimir = document.querySelector("#btnImprimir");


const loguear = texto => $estado.textContent += (new Date()).toLocaleString() + " " + texto + "\n";
const limpiarLog = () => $estado.textContent = "";

$btnLimpiarLog.addEventListener("click", limpiarLog);


const obtenerListaDeImpresoras = () => {
    loguear("Cargando lista...");
    ConectorPlugin.obtenerImpresoras()
        .then(listaDeImpresoras => {
            loguear("Lista cargada");
            listaDeImpresoras.forEach(nombreImpresora => {
                const option = document.createElement('option');
                option.value = option.text = nombreImpresora;
                $listaDeImpresoras.appendChild(option);
            })
        })
        .catch(() => {
            loguear("Error obteniendo impresoras. Asegúrese de que el plugin se está ejecutando");
        });
}


$btnImprimir.addEventListener("click", () => {
    let nombreImpresora = $listaDeImpresoras.value;
    if (!nombreImpresora) return loguear("Selecciona una impresora");
    let conector = new ConectorPlugin();
    conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.imagenDesdeUrl("https://github.com/parzibyte.png");
    conector.feed(1);
    conector.texto("Parzibyte's blog\n");
    conector.texto("Blog de un programador\n");
    conector.texto("Telefono: 123456789\n");
    conector.texto("Fecha/Hora: 2021-02-08 16:57:55\n");
    conector.texto("--------------------------------\n");
    conector.texto("Venta de plugin para impresora\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);
    conector.texto("25 USD\n");
    conector.texto("--------------------------------\n");
    conector.texto("TOTAL: 25 USD\n");
    conector.texto("--------------------------------\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("***Gracias por su compra***");
    conector.feed(4);
    conector.cortar();
    conector.cortarParcialmente();
    conector.imprimirEn(nombreImpresora)
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                loguear("Impreso correctamente");
            } else {
                loguear("Error. La respuesta es: " + respuestaAlImprimir);
            }
        });
});

// En el init, obtenemos la lista
obtenerListaDeImpresoras();
