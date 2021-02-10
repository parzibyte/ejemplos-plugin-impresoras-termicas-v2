const $estado = document.querySelector("#estado"),
    $nombreImpresora = document.querySelector("#nombreImpresora"),
    $btnLimpiarLog = document.querySelector("#btnLimpiarLog"),
    $btnImprimir = document.querySelector("#btnImprimir");


const loguear = texto => $estado.textContent += (new Date()).toLocaleString() + " " + texto + "\n";
const limpiarLog = () => $estado.textContent = "";

$btnLimpiarLog.addEventListener("click", limpiarLog);


$btnImprimir.addEventListener("click", async () => {
    imprimirTicket();
});

/*
* Encerrar comportamiento en una función para volverla a llamar si algo va mal
* */
const imprimirTicket = () => {

    let nombreImpresora = $nombreImpresora.value;
    if (!nombreImpresora) return loguear("Escribe el nombre de la impresora");
    loguear("Intentando imprimir...");
    // Intentar imprimir
    const conector = new ConectorPlugin();
    conector.texto("Hola mundo\n");
    conector.imprimirEn(nombreImpresora)
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                loguear("Impreso correctamente");
            } else {
                loguear("Error. La respuesta es: " + respuestaAlImprimir);
                loguear("Error. Volviendo a imprimir...");
                // Volvemos a llamar a la función
                imprimirTicket();
            }
        })
        .catch(() => {
            // Error de conexión. Igualmente reintentamos
            loguear("Error. Volviendo a imprimir...");
            // Volvemos a llamar a la función
            imprimirTicket();
        });
};