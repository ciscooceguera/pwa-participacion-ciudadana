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

const formularioConsulta =
    document.getElementById("consulta-form");

const folioConsultaInput =
    document.getElementById("folio-consulta");

const btnConsultar =
    document.getElementById("btn-consultar");

const errorFolio =
    document.getElementById("error-folio");

const mensajeConsulta =
    document.getElementById("mensaje-consulta");

const resultadoConsulta =
    document.getElementById("resultado-consulta");

const resultadoFolio =
    document.getElementById("resultado-folio");

const resultadoCategoria =
    document.getElementById("resultado-categoria");

const resultadoDescripcion =
    document.getElementById("resultado-descripcion");

const resultadoEstado =
    document.getElementById("resultado-estado");

const resultadoFecha =
    document.getElementById("resultado-fecha");

const resultadoUbicacion =
    document.getElementById("resultado-ubicacion");

const contenedorEvidenciaConsulta =
    document.getElementById("contenedor-evidencia-consulta");

const resultadoEvidencia =
    document.getElementById("resultado-evidencia");

const totalPuntos =
    document.getElementById("total-puntos");

const totalReportes =
    document.getElementById("total-reportes");

const proximaInsignia =
    document.getElementById("proxima-insignia");

const insignias = [
    {
        nombre: "Primer Reporte",
        reportesNecesarios: 1,
        elemento: document.getElementById(
            "insignia-primer-reporte"
        )
    },
    {
        nombre: "Observador Activo",
        reportesNecesarios: 3,
        elemento: document.getElementById(
            "insignia-observador-activo"
        )
    },
    {
        nombre: "Vecino Ejemplar",
        reportesNecesarios: 5,
        elemento: document.getElementById(
            "insignia-vecino-ejemplar"
        )
    }
];

const PUNTOS_POR_REPORTE = 10;


/*
 * Estado temporal de la interfaz.
 */

let ubicacionActual = null;
let envioEnProceso = false;
let consultaEnProceso = false;
let urlEvidenciaActual = null;


/*
 * Limpia la vista y cualquier URL temporal
 * creada para una evidencia consultada.
 */

function limpiarResultadoConsulta() {

    resultadoConsulta.hidden = true;
    contenedorEvidenciaConsulta.hidden = true;

    resultadoEvidencia.removeAttribute("src");

    if (urlEvidenciaActual !== null) {
        URL.revokeObjectURL(urlEvidenciaActual);
        urlEvidenciaActual = null;
    }
}


/*
 * Presenta un reporte recuperado de IndexedDB.
 */

function mostrarResultadoConsulta(reporte) {

    limpiarResultadoConsulta();

    resultadoFolio.textContent = reporte.folio;
    resultadoCategoria.textContent = reporte.categoria;
    resultadoDescripcion.textContent = reporte.descripcion;
    resultadoEstado.textContent = reporte.estado;

    const fecha = new Date(reporte.fechaCreacion);

    resultadoFecha.textContent = Number.isNaN(fecha.getTime())
        ? reporte.fechaCreacion
        : fecha.toLocaleString("es-MX", {
            dateStyle: "long",
            timeStyle: "short"
        });

    resultadoUbicacion.textContent = reporte.ubicacion
        ? "Disponible en el reporte local."
        : "No proporcionada.";

    if (reporte.evidencia instanceof Blob) {
        urlEvidenciaActual = URL.createObjectURL(
            reporte.evidencia
        );

        resultadoEvidencia.src = urlEvidenciaActual;
        contenedorEvidenciaConsulta.hidden = false;
    }

    resultadoConsulta.hidden = false;
}


/*
 * Calcula la participación a partir de los
 * reportes almacenados en este dispositivo.
 */

async function actualizarParticipacion() {

    try {
        const reportes =
            await BaseDatosReportes.obtenerTodosLosReportes();

        const cantidad = reportes.length;

        totalReportes.textContent = String(cantidad);
        totalPuntos.textContent = String(
            cantidad * PUNTOS_POR_REPORTE
        );

        insignias.forEach((insignia) => {
            const obtenida =
                cantidad >= insignia.reportesNecesarios;

            insignia.elemento.classList.toggle(
                "obtenida",
                obtenida
            );

            insignia.elemento.setAttribute(
                "aria-label",
                insignia.nombre +
                (obtenida
                    ? ": obtenida."
                    : ": pendiente.")
            );
        });

        const siguiente = insignias.find(
            (insignia) =>
                cantidad < insignia.reportesNecesarios
        );

        if (!siguiente) {
            proximaInsignia.textContent =
                "Has obtenido todas las insignias del MVP.";

            return;
        }

        const faltantes =
            siguiente.reportesNecesarios - cantidad;

        proximaInsignia.textContent =
            "Faltan " +
            faltantes +
            (faltantes === 1
                ? " reporte para obtener "
                : " reportes para obtener ") +
            siguiente.nombre +
            ".";
    }
    catch (error) {
        console.error(
            "Error al actualizar la participación:",
            error
        );

        proximaInsignia.textContent =
            "No fue posible calcular la participación local.";
    }
}


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
    else {

        const validacionEvidencia =
            GestorReportes.validarEvidencia(
                archivo
            );

        if (!validacionEvidencia.valida) {

            mostrarError(
                evidenciaInput,
                errorEvidencia,
                validacionEvidencia.mensaje
            );

            formularioValido = false;
        }
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


        const validacionEvidencia =
            GestorReportes.validarEvidencia(
                archivo
            );

        if (!validacionEvidencia.valida) {

            mostrarError(
                evidenciaInput,
                errorEvidencia,
                validacionEvidencia.mensaje
            );

            estadoEvidencia.textContent =
                "Archivo rechazado: " +
                archivo.name;

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
         * al Gestor de Reportes.
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

            const resultado = await GestorReportes.registrarReporte(datosReporte);


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

            folioConsultaInput.value =
                resultado.folio;

            limpiarError(
                folioConsultaInput,
                errorFolio
            );

            actualizarParticipacion();


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


/*
 * Normaliza y limpia el error del folio
 * mientras el usuario escribe.
 */

folioConsultaInput.addEventListener(

    "input",

    function () {

        folioConsultaInput.value =
            folioConsultaInput.value.toUpperCase();

        if (folioConsultaInput.value.trim() !== "") {
            limpiarError(
                folioConsultaInput,
                errorFolio
            );
        }

    }

);


/*
 * Consulta un reporte local mediante su folio.
 */

formularioConsulta.addEventListener(

    "submit",

    async function (evento) {

        evento.preventDefault();

        if (consultaEnProceso) {
            return;
        }

        const folio =
            folioConsultaInput.value.trim().toUpperCase();

        folioConsultaInput.value = folio;

        limpiarError(
            folioConsultaInput,
            errorFolio
        );

        mensajeConsulta.textContent = "";
        mensajeConsulta.className =
            "mensaje-general mensaje-consulta";

        if (!/^PC-\d{8}-[A-Z0-9]{6}$/.test(folio)) {
            limpiarResultadoConsulta();

            mostrarError(
                folioConsultaInput,
                errorFolio,
                "Escribe un folio con el formato PC-YYYYMMDD-XXXXXX."
            );

            mensajeConsulta.textContent =
                "Revisa el folio antes de consultar.";

            mensajeConsulta.classList.add("error");

            folioConsultaInput.focus();

            return;
        }

        consultaEnProceso = true;
        btnConsultar.disabled = true;
        btnConsultar.textContent = "Consultando...";

        try {
            const reporte =
                await BaseDatosReportes.obtenerReportePorFolio(
                    folio
                );

            if (reporte === null) {
                limpiarResultadoConsulta();

                mensajeConsulta.textContent =
                    "No se encontró un reporte con ese folio en este dispositivo.";

                mensajeConsulta.classList.add("error");

                return;
            }

            mostrarResultadoConsulta(reporte);

            mensajeConsulta.textContent =
                "Reporte encontrado en el almacenamiento local.";

            mensajeConsulta.classList.add("exito");
        }
        catch (error) {
            limpiarResultadoConsulta();

            console.error(
                "Error durante la consulta:",
                error
            );

            mensajeConsulta.textContent =
                "No fue posible consultar el reporte local.";

            mensajeConsulta.classList.add("error");
        }
        finally {
            consultaEnProceso = false;
            btnConsultar.disabled = false;
            btnConsultar.textContent =
                "Consultar reporte";
        }

    }

);


window.addEventListener(
    "beforeunload",
    limpiarResultadoConsulta
);


actualizarParticipacion();
