const $estado = document.querySelector("#estado"),
    $ip = document.querySelector("#ip"),
    $nombreImpresora = document.querySelector("#nombreImpresora"),
    $btnLimpiarLog = document.querySelector("#btnLimpiarLog"),
    $btnImprimir = document.querySelector("#btnImprimir");


const loguear = texto => $estado.textContent += (new Date()).toLocaleString() + " " + texto + "\n";
const limpiarLog = () => $estado.textContent = "";

$btnLimpiarLog.addEventListener("click", limpiarLog);


$btnImprimir.addEventListener("click", async () => {
    let nombreImpresora = $nombreImpresora.value;
    let ip = $ip.value;
    if (!nombreImpresora) return loguear("Selecciona una impresora");
    if (!ip) return loguear("Selecciona una impresora");
    const conector = new ConectorPlugin();
    conector.texto("Hola mundo\n");
    conector.imprimirEnImpresoraRemota(nombreImpresora, ip)
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                loguear("Impreso correctamente");
            } else {
                loguear("Error. La respuesta es: " + respuestaAlImprimir);
            }
        });
        
});
