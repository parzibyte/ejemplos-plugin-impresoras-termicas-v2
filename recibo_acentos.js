let conector = new ConectorPlugin();
conector.establecerTamanioFuente(1, 1);
conector.establecerEnfatizado(0);
conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
conector.imagenDesdeUrl("https://github.com/parzibyte.png");
conector.feed(1);
conector.texto("Parzibyte's blog\n");
conector.texto("Blog de un programador\n");
conector.textoConAcentos("Teléfono: 123456789\n");
conector.texto("Fecha/Hora: 2021-02-08 16:57:55\n");
conector.establecerEnfatizado(1);
conector.texto("Cliente: ");
conector.establecerEnfatizado(0);
conector.textoConAcentos("María José\n");
conector.texto("--------------------------------\n");
conector.texto("Audífonos HyperX\n");
conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);
conector.texto("25 USD\n");
conector.texto("--------------------------------\n");
conector.texto("TOTAL: 25 USD\n");
conector.texto("--------------------------------\n");
conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
conector.textoConAcentos("¡Muchas gracias por su compra y feliz año nuevo 2021!");
conector.feed(4);
conector.cortar();
conector.cortarParcialmente();
conector.imprimirEn("ZJ-58")
    .then(respuestaAlImprimir => {
        if (respuestaAlImprimir === true) {
            loguear("Impreso correctamente");
        } else {
            loguear("Error. La respuesta es: " + respuestaAlImprimir);
        }
    });