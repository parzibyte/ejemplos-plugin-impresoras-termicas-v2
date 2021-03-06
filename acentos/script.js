const $estado = document.querySelector("#estado"),
    $listaDeImpresoras = document.querySelector("#listaDeImpresoras"),
    $btnLimpiarLog = document.querySelector("#btnLimpiarLog"),
    $btnImprimir = document.querySelector("#btnImprimir");

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

const loguear = texto => $estado.textContent += (new Date()).toLocaleString() + " " + texto + "\n";
const limpiarLog = () => $estado.textContent = "";

$btnLimpiarLog.addEventListener("click", limpiarLog);


$btnImprimir.addEventListener("click", async () => {
    let nombreImpresora = $listaDeImpresoras.value;
    if (!nombreImpresora) return loguear("Selecciona una impresora");
    const cadenaConAcentos = "María José come Ñampi\n";
    const respuestaAlImprimir = await new ConectorPlugin()
        .texto("Tratando de imprimir acentos sin forzar:\n")
        .texto(cadenaConAcentos)
        .texto("Ahora tratando de imprimir acentos, pero forzando:\n")
        /*
        Nota: solo hace falta llamar a "textoConAcentos" una vez, eso "habilita" los acentos
        y las siguientes llamadas a "text" ya deben soportar acentos
        */
        .textoConAcentos(cadenaConAcentos)
        .texto("Texto con acentos y centrado:")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto(cadenaConAcentos)
        .feed(3) // Dejar 3 saltos de línea. Esto es muy importante
        .cortar()
        .imprimirEn(nombreImpresora); // Siempre debes invocar a "imprimirEn" al final, pasando el nombre de la impresora
    if (respuestaAlImprimir === true) {
        loguear("Impreso correctamente");
    } else {
        loguear("Error. La respuesta es: " + respuestaAlImprimir);
    }
});

obtenerListaDeImpresoras();