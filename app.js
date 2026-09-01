/*
 * Referencias a los elementos de la interfaz.
 */

const formulario =
    document.getElementById("reporte-form");

const categoriaInput =
    document.getElementById("categoria");

const descripcionInput =
    document.getElementById("descripcion");

const evidenciaInput =
    document.getElementById("evidencia");

const btnUbicacion =
    document.getElementById("btn-ubicacion");

const btnRegistrar =
    document.getElementById("btn-registrar");

const errorCategoria =
    document.getElementById("error-categoria");

const errorDescripcion =
    document.getElementById("error-descripcion");

const errorEvidencia =
    document.getElementById("error-evidencia");

const contadorDescripcion =
    document.getElementById("contador-descripcion");

const estadoEvidencia =
    document.getElementById("estado-evidencia");

const estadoUbicacion =
    document.getElementById("estado-ubicacion");

const mensajeGeneral =
    document.getElementById("mensaje-general");


/*
 * Estado temporal de la interfaz.
 */

let ubicacionActual = null;
let envioEnProceso = false;


/*
 * Muestra un mensaje general.
 *
 * El tipo puede ser:
 * - error
 * - exito
 */

function mostrarMensaje(texto, tipo) {

    mensajeGeneral.textContent = texto;

    mensajeGeneral.className =
        "mensaje-general " + tipo;
}


/*
 * Muestra un error asociado a un campo.
 */

function mostrarError(
    campo,
    elementoError,
    mensaje
) {

    elementoError.textContent = mensaje;

    campo.setAttribute(
        "aria-invalid",
        "true"
    );
}


/*
 * Elimina el error asociado a un campo.
 */

function limpiarError(
    campo,
    elementoError
) {

    elementoError.textContent = "";

    campo.removeAttribute(
        "aria-invalid"
    );
}


/*
 * Elimina todos los errores de validación.
 */

function limpiarErrores() {

    limpiarError(
        categoriaInput,
        errorCategoria
    );

    limpiarError(
        descripcionInput,
        errorDescripcion
    );

    limpiarError(
        evidenciaInput,
        errorEvidencia
    );
}


/*
 * Valida los campos requeridos.
 *
 * La ubicación no se valida porque
 * permanece como dato opcional.
 */

function validarFormulario() {

    limpiarErrores();

    let formularioValido = true;

    const categoria =
        categoriaInput.value.trim();

    const descripcion =
        descripcionInput.value.trim();

    const archivo =
        evidenciaInput.files.length > 0
            ? evidenciaInput.files[0]
            : null;


    if (categoria === "") {

        mostrarError(
            categoriaInput,
            errorCategoria,
            "La categoría es obligatoria."
        );

        formularioValido = false;
    }


    if (descripcion === "") {

        mostrarError(
            descripcionInput,
            errorDescripcion,
            "La descripción es obligatoria."
        );

        formularioValido = false;
    }


    if (archivo === null) {

        mostrarError(
            evidenciaInput,
            errorEvidencia,
            "Debes seleccionar una evidencia fotográfica."
        );

        formularioValido = false;
    }
    else if (!archivo.type.startsWith("image/")) {

        mostrarError(
            evidenciaInput,
            errorEvidencia,
            "El archivo seleccionado debe ser una imagen."
        );

        formularioValido = false;
    }


    return formularioValido;
}


/*
 * Solicita la ubicación mediante la
 * Geolocation API del navegador.
 */

function solicitarUbicacion() {

    estadoUbicacion.textContent =
        "Solicitando ubicación...";

    btnUbicacion.disabled = true;


    if (!navigator.geolocation) {

        ubicacionActual = null;

        estadoUbicacion.textContent =
            "La ubicación no está disponible en este navegador. " +
            "Puedes continuar sin ella.";

        btnUbicacion.disabled = false;

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function (posicion) {

            ubicacionActual = {

                latitud:
                    posicion.coords.latitude,

                longitud:
                    posicion.coords.longitude
            };


            estadoUbicacion.textContent =
                "Ubicación obtenida correctamente.";

            btnUbicacion.disabled = false;
        },


        function () {

            ubicacionActual = null;

            estadoUbicacion.textContent =
                "No fue posible obtener la ubicación. " +
                "Puedes continuar sin ella.";

            btnUbicacion.disabled = false;
        },


        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        }

    );
}


/*
 * Representa temporalmente al futuro
 * Gestor de Reportes.
 *
 * No almacena información y no implementa
 * IndexedDB ni un backend.
 */

function registrarReporteSimulado(datos) {

    console.log(
        "Datos enviados al Gestor de Reportes simulado:",
        datos
    );


    return new Promise(function (resolve) {

        setTimeout(function () {

            resolve({

                exito: true,

                /*
                 * Folio demostrativo devuelto por
                 * el gestor simulado.
                 */

                folio: "DEMO-HT001"
            });

        }, 600);

    });
}


/*
 * Actualiza el contador de caracteres
 * y elimina el error cuando el usuario
 * corrige la descripción.
 */

descripcionInput.addEventListener(

    "input",

    function () {

        contadorDescripcion.textContent =
            descripcionInput.value.length +
            " caracteres";


        if (
            descripcionInput.value.trim() !== ""
        ) {

            limpiarError(
                descripcionInput,
                errorDescripcion
            );
        }

    }

);


/*
 * Elimina el error cuando el usuario
 * corrige la categoría.
 */

categoriaInput.addEventListener(

    "input",

    function () {

        if (
            categoriaInput.value.trim() !== ""
        ) {

            limpiarError(
                categoriaInput,
                errorCategoria
            );
        }

    }

);


/*
 * Muestra el nombre de la evidencia
 * seleccionada y valida su tipo.
 */

evidenciaInput.addEventListener(

    "change",

    function () {

        if (
            evidenciaInput.files.length === 0
        ) {

            estadoEvidencia.textContent =
                "Ninguna imagen seleccionada.";

            return;
        }


        const archivo =
            evidenciaInput.files[0];


        estadoEvidencia.textContent =
            "Archivo seleccionado: " +
            archivo.name;


        if (
            !archivo.type.startsWith("image/")
        ) {

            mostrarError(
                evidenciaInput,
                errorEvidencia,
                "El archivo seleccionado debe ser una imagen."
            );

            return;
        }


        limpiarError(
            evidenciaInput,
            errorEvidencia
        );

        estadoEvidencia.textContent =
            "Evidencia seleccionada: " +
            archivo.name;

    }

);


/*
 * Ejecuta la solicitud de ubicación.
 */

btnUbicacion.addEventListener(
    "click",
    solicitarUbicacion
);


/*
 * Procesa el envío del formulario.
 */

formulario.addEventListener(

    "submit",

    async function (evento) {

        /*
         * Evita la recarga de la página.
         */

        evento.preventDefault();


        /*
         * Ignora solicitudes adicionales
         * mientras existe un envío activo.
         */

        if (envioEnProceso) {
            return;
        }


        mensajeGeneral.textContent = "";

        mensajeGeneral.className =
            "mensaje-general";


        if (!validarFormulario()) {

            mostrarMensaje(
                "Revisa los campos marcados antes de continuar.",
                "error"
            );

            return;
        }


        envioEnProceso = true;

        btnRegistrar.disabled = true;

        btnRegistrar.textContent =
            "Registrando...";


        const archivo =
            evidenciaInput.files[0];


        /*
         * Construye el objeto que se entrega
         * al futuro Gestor de Reportes.
         */

        const datosReporte = {

            categoria:
                categoriaInput.value.trim(),

            descripcion:
                descripcionInput.value.trim(),

            evidencia:
                archivo,

            ubicacion:
                ubicacionActual
        };


        try {

            const resultado =
                await registrarReporteSimulado(
                    datosReporte
                );


            if (!resultado.exito) {

                mostrarMensaje(
                    "No fue posible registrar el reporte.",
                    "error"
                );

                return;
            }


            mostrarMensaje(
                "Reporte recibido correctamente. Folio: " +
                resultado.folio,
                "exito"
            );


            /*
             * Reinicia el formulario y sus estados.
             */

            formulario.reset();

            ubicacionActual = null;

            estadoUbicacion.textContent =
                "Ubicación no solicitada.";

            estadoEvidencia.textContent =
                "Ninguna imagen seleccionada.";

            contadorDescripcion.textContent =
                "0 caracteres";

            limpiarErrores();

            categoriaInput.focus();

        }
        catch (error) {

            console.error(
                "Error durante el registro:",
                error
            );


            mostrarMensaje(
                "Ocurrió un error al procesar el reporte.",
                "error"
            );
        }
        finally {

            envioEnProceso = false;

            btnRegistrar.disabled = false;

            btnRegistrar.textContent =
                "Registrar reporte";
        }

    }

);