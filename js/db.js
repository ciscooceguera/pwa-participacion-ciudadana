/*
 * Acceso a datos local mediante IndexedDB.
 *
 * Los reportes del MVP se almacenan únicamente
 * en el dispositivo del usuario.
 */

(function () {
    "use strict";

    const DB_NOMBRE = "ParticipacionCiudadanaDB";
    const DB_VERSION = 1;
    const STORE_REPORTES = "reportes";

    function crearError(mensaje, causa) {
        const error = new Error(mensaje);

        if (causa) {
            error.cause = causa;
        }

        return error;
    }

    /*
     * Abre la base de datos.
     * Si no existe, crea el almacén de reportes.
     */
    function abrirBaseDatos() {
        return new Promise((resolve, reject) => {
            if (!("indexedDB" in window)) {
                reject(
                    new Error(
                        "IndexedDB no está disponible en este navegador."
                    )
                );

                return;
            }

            const solicitud = indexedDB.open(
                DB_NOMBRE,
                DB_VERSION
            );

            let finalizada = false;

            function rechazarApertura(mensaje, causa) {
                if (finalizada) {
                    return;
                }

                finalizada = true;

                reject(
                    crearError(
                        mensaje,
                        causa
                    )
                );
            }

            solicitud.onupgradeneeded = (evento) => {
                const db = evento.target.result;

                if (
                    !db.objectStoreNames.contains(
                        STORE_REPORTES
                    )
                ) {
                    db.createObjectStore(
                        STORE_REPORTES,
                        {
                            keyPath: "folio"
                        }
                    );
                }
            };

            solicitud.onsuccess = () => {
                const db = solicitud.result;

                if (finalizada) {
                    db.close();
                    return;
                }

                finalizada = true;

                db.onversionchange = () => {
                    db.close();
                };

                resolve(db);
            };

            solicitud.onerror = () => {
                rechazarApertura(
                    "No fue posible abrir la base de datos local.",
                    solicitud.error
                );
            };

            solicitud.onblocked = () => {
                rechazarApertura(
                    "La base de datos local está bloqueada por otra pestaña."
                );
            };
        });
    }

    /*
     * Ejecuta una solicitud y resuelve únicamente cuando
     * la transacción completa se confirma.
     */
    async function ejecutarOperacion(
        modo,
        crearSolicitud,
        mensajeError
    ) {
        const db = await abrirBaseDatos();

        return new Promise((resolve, reject) => {
            let finalizada = false;
            let resultado;

            function rechazarOperacion(causa) {
                if (finalizada) {
                    return;
                }

                finalizada = true;
                db.close();

                reject(
                    crearError(
                        mensajeError,
                        causa
                    )
                );
            }

            try {
                const transaccion = db.transaction(
                    STORE_REPORTES,
                    modo
                );

                const almacen = transaccion.objectStore(
                    STORE_REPORTES
                );

                const solicitud = crearSolicitud(almacen);

                solicitud.onsuccess = () => {
                    resultado = solicitud.result;
                };

                transaccion.oncomplete = () => {
                    if (finalizada) {
                        return;
                    }

                    finalizada = true;
                    db.close();
                    resolve(resultado);
                };

                transaccion.onerror = () => {
                    rechazarOperacion(
                        transaccion.error ||
                        solicitud.error
                    );
                };

                transaccion.onabort = () => {
                    rechazarOperacion(
                        transaccion.error ||
                        solicitud.error
                    );
                };
            }
            catch (error) {
                rechazarOperacion(error);
            }
        });
    }

    /*
     * Guarda un reporte completo.
     */
    async function guardarReporte(reporte) {
        if (
            !reporte ||
            typeof reporte !== "object" ||
            typeof reporte.folio !== "string" ||
            reporte.folio.trim() === ""
        ) {
            throw new TypeError(
                "El reporte debe incluir un folio válido."
            );
        }

        await ejecutarOperacion(
            "readwrite",
            (almacen) => almacen.add(reporte),
            "No fue posible guardar el reporte."
        );

        return reporte;
    }

    /*
     * Busca un reporte mediante su folio.
     */
    async function obtenerReportePorFolio(folio) {
        const folioNormalizado =
            typeof folio === "string"
                ? folio.trim()
                : "";

        if (folioNormalizado === "") {
            throw new TypeError(
                "Debes indicar un folio válido."
            );
        }

        const reporte = await ejecutarOperacion(
            "readonly",
            (almacen) => almacen.get(folioNormalizado),
            "No fue posible consultar el reporte."
        );

        return reporte || null;
    }

    /*
     * Obtiene todos los reportes almacenados.
     */
    async function obtenerTodosLosReportes() {
        const reportes = await ejecutarOperacion(
            "readonly",
            (almacen) => almacen.getAll(),
            "No fue posible obtener los reportes."
        );

        return reportes || [];
    }

    window.BaseDatosReportes = {
        guardarReporte,
        obtenerReportePorFolio,
        obtenerTodosLosReportes
    };
})();
