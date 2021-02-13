const conector = new ConectorPlugin();
conector.textoConAcentos("¡Gracias por su compra, María José!\nFeliz año nuevo");
// Dejar unos saltos de línea
conector.feed(5);
conector.imprimirEn("Nombre de la impresora");