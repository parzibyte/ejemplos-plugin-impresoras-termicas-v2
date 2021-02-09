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
    const conector = new ConectorPlugin()
        .texto("Texto de la impresora. Un feed de 3:\n")
        .feed(3)
        .establecerEnfatizado(1)
        .texto("Texto con emphasize en 1\n")
        .establecerEnfatizado(0)
        .texto("Texto con emphasize en 0\n")
        .establecerFuente(ConectorPlugin.Constantes.FuenteA)
        .texto("Fuente A\n")
        .establecerFuente(ConectorPlugin.Constantes.FuenteB)
        .texto("Fuente B\n")
        .establecerFuente(ConectorPlugin.Constantes.FuenteC)
        .texto("Fuente C\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto("Alineado al centro\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)
        .texto("Alineado a la izquierda\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
        .texto("Alineado a la derecha\n")
        .establecerTamanioFuente(1, 1)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda); // <- Aquí dejamos de encadenar los métodos, puedes encadenarlos o llamar a la misma operación en cada paso
    // Nota: El tamaño máximo es 8,8 pero no lo pongo porque consume demasiado papel. Para la demostración solo pongo hasta el 3
    for (let i = 1; i <= 3; i++) {
        conector.establecerTamanioFuente(i, i)
            .texto(`Texto con size ${i},${i}\n`);
    }
    conector
        .feed(1)
        .establecerTamanioFuente(1, 1)
        .texto("Un QR nativo (a veces no funciona):\n")
        .qr("Soy un código QR | https://parzibyte.me/blog")
        .feed(1)
        .textoConAcentos("Un código de barras:\n")
        .codigoDeBarras("123", ConectorPlugin.Constantes.AccionBarcode39)
        .feed(1)
        .texto("Un QR como imagen en el centro (funciona la mayoría de veces):\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .qrComoImagen("Parzibyte")
        .establecerTamanioFuente(1, 1)
        .texto("¿Cuál es el avatar de Parzibyte en GitHub?\n")
        .imagenDesdeUrl("https://github.com/parzibyte.png")
        .abrirCajon() // Abrir cajón de dinero. Opcional
        .cortar() // Cortar
    // impresora.cutPartial(); // Cortar parcialmente (opcional)
    // Recomiendo dejar un feed de 4 al final de toda impresión
    conector.feed(4)
    const respuestaAlImprimir = await conector.imprimirEn(nombreImpresora);
    if (respuestaAlImprimir === true) {
        loguear("Impreso correctamente");
    } else {
        loguear("Error. La respuesta es: " + respuestaAlImprimir);
    }
});

obtenerListaDeImpresoras();