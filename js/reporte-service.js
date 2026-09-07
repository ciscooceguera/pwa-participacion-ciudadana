/*
 * Gestor de Reportes
 *
 * Responsable de crear y persistir un reporte válido para el MVP.
 */

(function () {
    "use strict";

    /*
     * Genera un identificador aleatorio corto.
     */
    function generarCodigoAleatorio() {
        const valores = new Uint32Array(1);
        crypto.getRandomValues(valores);

        return valores[0]
            .toString(36)
            .toUpperCase()
            .padStart(6, "0")
            .slice(0, 6);
    }

    /*
     * Genera un folio anónimo.
     *
     * Ejemplo:
     * PC-20260906-A8F21C
     */
    function generarFolio() {
        const fecha = new Date();

        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");

        return (
            "PC-" +
            anio +
            mes +
            dia +
            "-" +
            generarCodigoAleatorio()
        );
    }

    /*
     * Comprueba que el objeto recibido contenga
     * los datos esenciales de un reporte.
     */
    function validarDatos(datos) {
        if (!datos || typeof datos !== "object") {
            return false;
        }

        if (
            typeof datos.categoria !== "string" ||
            datos.categoria.trim() === ""
        ) {
            return false;
        }

        if (
            typeof datos.descripcion !== "string" ||
            datos.descripcion.trim() === ""
        ) {
            return false;
        }

        if (!(datos.evidencia instanceof File)) {
            return false;
        }

        return true;
    }

    /*
     * Construye un reporte del MVP.
     */
    async function registrarReporte(datos) {
        if (!validarDatos(datos)) {
            throw new Error(
                "Los datos recibidos por el Gestor de Reportes no son válidos."
            );
        }

        const reporte = {
            folio: generarFolio(),
            categoria: datos.categoria.trim(),
            descripcion: datos.descripcion.trim(),
            evidencia: datos.evidencia,
            ubicacion: datos.ubicacion || null,
            estado: "Registrado",
            fechaCreacion: new Date().toISOString()
        };

        if (
            !window.BaseDatosReportes ||
            typeof window.BaseDatosReportes.guardarReporte !== "function"
        ) {
            throw new Error(
                "El acceso a la base de datos local no está disponible."
            );
        }

        await window.BaseDatosReportes.guardarReporte(
            reporte
        );

        console.log(
            "Reporte creado y almacenado por el Gestor de Reportes:",
            reporte
        );

        return {
            exito: true,
            folio: reporte.folio,
            reporte: reporte
        };
    }

    /*
     * API pública del módulo.
     */
    window.GestorReportes = {
        registrarReporte
    };
})();
