const ConectorPlugin = (() => {

    /**
     * Una clase para interactuar con el plugin
     *
     * @author parzibyte
     * @see https://parzibyte.me/blog
     */

    class Operacion {
        constructor(accion, datos) {
            this.accion = accion + "";
            this.datos = datos + "";
        }
    }

    class ConectorPlugin {

        static URL_PLUGIN_POR_DEFECTO = "http://localhost:8000";
        static OperacionTicket = Operacion;
        static Constantes = {
            AccionTextoConAcentos: "textoacentos",
            AccionQrComoImagen: "qrimagen",
            AccionImagen: "imagen",
            AccionText: "text",
            AccionCut: "cut",
            AccionPulse: "pulse",
            AccionCutPartial: "cutpartial",
            AccionJustification: "setJustification",
            AccionTextSize: "setTextSize",
            AccionFont: "setFont",
            AccionEmphasize: "setEmphasis",
            AccionFeed: "feed",
            AccionQr: "qrCode",
            AlineacionCentro: "center",
            AlineacionDerecha: "right",
            AlineacionIzquierda: "left",
            FuenteA: "A",
            FuenteB: "B",
            FuenteC: "C",
            AccionBarcode128: "barcode128",
            AccionBarcode39: "barcode39",
            AccionBarcode93: "barcode93",
            AccionBarcodeItf: "barcodeitf",
            AccionBarcodeJan13: "barcodejan13",
            AccionBarcodeJan8: "barcodejan8",
            AccionBarcodeTextAbove: "barcodetextabove",
            AccionBarcodeTextBelow: "barcodetextbelow",
            AccionBarcodeTextNone: "barcodetextnone",
            AccionBarcodeUPCA: "barcodeUPCA",
            AccionBarcodeUPCE: "barcodeUPCE",
            AccionImagenLocal: "imagenlocal",
        };

        constructor(ruta) {
            if (!ruta) ruta = ConectorPlugin.URL_PLUGIN_POR_DEFECTO;
            this.ruta = ruta;
            this.operaciones = [];
            return this;
        }

        static obtenerImpresoras(ruta) {
            if (ruta) ConectorPlugin.URL_PLUGIN_POR_DEFECTO = ruta;
            return fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/impresoras")
                .then(r => r.json());
        }

        texto(text) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionText, text));
            return this;
        }

        textoConAcentos(texto) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionTextoConAcentos, texto));
            return this;
        }

        feed(n) {
            if (!parseInt(n) || parseInt(n) < 0) {
                throw Error("Valor para feed inválido");
            }
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionFeed, n));
            return this;
        }

        establecerTamanioFuente(multiplicadorAncho, multiplicadorAlto) {
            multiplicadorAncho = parseInt(multiplicadorAncho);
            multiplicadorAlto = parseInt(multiplicadorAlto)
            if (multiplicadorAncho < 1 || multiplicadorAncho > 8) throw "El multiplicador de ancho está fuera del rango";
            if (multiplicadorAlto < 1 || multiplicadorAlto > 8) throw "El multiplicador de alto está fuera del rango";
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionTextSize, `${multiplicadorAncho},${multiplicadorAlto}`));
            return this;
        }

        establecerFuente(font) {
            if (font !== ConectorPlugin.Constantes.FuenteA && font !== ConectorPlugin.Constantes.FuenteB && font !== ConectorPlugin.Constantes.FuenteC) throw Error("Fuente inválida");
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionFont, font));
            return this;
        }

        establecerEnfatizado(val) {
            if (val !== 0 && val !== 1) {
                throw Error("El valor debe ser 1 para true, 0 para false");
            }
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionEmphasize, val));
            return this;
        }

        establecerJustificacion(justification) {
            if (justification !== ConectorPlugin.Constantes.AlineacionCentro && justification !== ConectorPlugin.Constantes.AlineacionDerecha && justification !== ConectorPlugin.Constantes.AlineacionIzquierda) {
                throw Error(`Alineación ${justification} inválida`);
            }
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionJustification, justification));
            return this;
        }

        cortar() {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionCut, ""));
            return this;
        }

        abrirCajon() {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionPulse, ""));
            return this;
        }

        cortarParcialmente() {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionCutPartial, ""));
            return this;
        }


        imagenDesdeUrl(url) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionImagen, url));
            return this;
        }

        imagenLocal(ubicacion) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionImagenLocal, ubicacion));
            return this;
        }

        qr(contenido) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionQr, contenido));
            return this;
        }

        qrComoImagen(contenido) {
            this.operaciones.push(new ConectorPlugin.OperacionTicket(ConectorPlugin.Constantes.AccionQrComoImagen, contenido));
            return this;
        }


        validarTipoDeCodigoDeBarras(tipo) {
            if (
                [
                    ConectorPlugin.Constantes.AccionBarcode128,
                    ConectorPlugin.Constantes.AccionBarcode39,
                    ConectorPlugin.Constantes.AccionBarcode93,
                    ConectorPlugin.Constantes.AccionBarcodeItf,
                    ConectorPlugin.Constantes.AccionBarcodeJan13,
                    ConectorPlugin.Constantes.AccionBarcodeJan8,
                    ConectorPlugin.Constantes.AccionBarcodeTextAbove,
                    ConectorPlugin.Constantes.AccionBarcodeTextBelow,
                    ConectorPlugin.Constantes.AccionBarcodeTextNone,
                    ConectorPlugin.Constantes.AccionBarcodeUPCA,
                    ConectorPlugin.Constantes.AccionBarcodeUPCE,
                ]
                    .indexOf(tipo) === -1
            ) throw Error("Tipo de código de barras no soportado");
        }

        codigoDeBarras(contenido, tipo) {
            this.validarTipoDeCodigoDeBarras(tipo);
            this.operaciones.push(new ConectorPlugin.OperacionTicket(tipo, contenido));
            return this;
        }

        async imprimirEn(nombreImpresora) {
            const payload = {
                operaciones: this.operaciones,
                impresora: nombreImpresora,
            };
            const respuestaRaw = await fetch(this.ruta + "/imprimir", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            return await respuestaRaw.json();
        }
    }

    return ConectorPlugin;
})();