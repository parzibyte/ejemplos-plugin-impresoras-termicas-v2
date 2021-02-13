const URL_IMAGEN_GITHUB = "https://github.com/parzibyte.png",
    URL_IMAGEN_LOCAL = "http://localhost/mario.jpg",
    RUTA_ABSOLUTA_IMAGEN_LOCAL = "C:\\Users\\Luis Cabrera Benito\\Desktop\\im\\space_invaders.png";
const respuesta = new ConectorPlugin()
    .establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
    .texto(`Imagen desde URL ${URL_IMAGEN_GITHUB}\n`)
    .imagenDesdeUrl(URL_IMAGEN_GITHUB)
    .feed(1)
    .texto(`Imagen desde URL pero local (${URL_IMAGEN_LOCAL})\n`)
    .imagenDesdeUrl(URL_IMAGEN_LOCAL)
    .feed(1)
    .texto(`Imagen dentro del sistema de archivos (${RUTA_ABSOLUTA_IMAGEN_LOCAL})\n`)
    .imagenLocal(RUTA_ABSOLUTA_IMAGEN_LOCAL)
    .feed(4)
    .imprimirEn("ZJ-58")
    .then(respuesta => {
        console.log("La respuesta es: ", respuesta);
    });

