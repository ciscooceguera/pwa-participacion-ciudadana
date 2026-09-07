# PWA de Participación Ciudadana

MVP académico de una aplicación web progresiva para registrar y consultar
problemas urbanos de manera anónima. La información se conserva localmente en
el navegador mediante IndexedDB y no se envía a servidores externos.

## Estado del MVP

El alcance previsto para la Meta 1.7 está implementado:

- registro anónimo de categoría, descripción y evidencia fotográfica;
- ubicación opcional mediante la Geolocation API;
- folio con formato `PC-YYYYMMDD-XXXXXX`;
- persistencia de reportes y fotografías con IndexedDB;
- consulta local por folio, incluso después de recargar el navegador;
- estado inicial `Registrado` para cada reporte;
- participación local con puntos e insignias;
- instalación como PWA y funcionamiento sin conexión;
- interfaz responsiva y mejoras de accesibilidad;
- auditoría inicial y final con Lighthouse.

## Ejecución local

Las funciones de IndexedDB, Service Worker e instalación PWA requieren un
origen seguro. Para desarrollo puede utilizarse `localhost`; no se debe abrir
`index.html` directamente desde el sistema de archivos.

Desde la raíz del repositorio, con Python instalado:

```powershell
python -m http.server 8000
```

Después, abrir `http://localhost:8000` en Chrome u otro navegador compatible.

## Uso básico

1. Escribir la categoría y la descripción del problema.
2. Seleccionar una fotografía JPG, PNG o WebP de hasta 5 MB.
3. Opcionalmente, pulsar **Obtener mi ubicación** y responder al permiso del
   navegador. Rechazarlo no impide continuar.
4. Pulsar **Registrar reporte** y conservar el folio generado.
5. Escribir ese folio en **Consultar un reporte** para recuperar el detalle y
   la evidencia desde el mismo navegador y dispositivo.

Los datos continúan disponibles al recargar o cerrar el navegador, mientras no
se eliminen los datos del sitio.

## Participación local

Estas reglas son decisiones de implementación del MVP porque la actividad no
definía cantidades ni umbrales:

| Elemento | Regla |
| --- | --- |
| Puntos | 10 por cada reporte local |
| Primer Reporte | 1 reporte |
| Observador Activo | 3 reportes |
| Vecino Ejemplar | 5 reportes |

No existen perfiles, cuentas ni rankings. El avance se calcula únicamente a
partir de los reportes almacenados en el dispositivo.

## Instalación y modo sin conexión

Después de visitar la aplicación mediante HTTPS o `localhost`, un navegador
compatible puede ofrecer la opción **Instalar aplicación** en su menú o barra
de direcciones. El Web App Manifest define el nombre, colores e iconos, y el
Service Worker conserva el shell de la aplicación para abrirla sin red.

El registro, la consulta, los puntos y las insignias funcionan con IndexedDB
sin conexión. No existe sincronización remota: los datos de un navegador no
aparecen en otro equipo o perfil.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- IndexedDB, Cache Storage, Service Worker y Geolocation API

No utiliza frameworks, backend, autenticación ni servicios de terceros.

## Estructura principal

```text
index.html                         Interfaz del MVP
styles.css                         Diseño responsivo
app.js                             Validación e interacción
js/reporte-service.js              Reglas, folios y registro
js/db.js                           Persistencia y consultas con IndexedDB
manifest.webmanifest               Metadatos de instalación PWA
sw.js                              Caché y apertura sin conexión
icons/                             Iconos normal y maskable
documentacion/                     Decisiones y pruebas académicas
evidencias/meta-1.7/               Pruebas funcionales del MVP
evidencias/lighthouse/             Auditorías y capturas de Lighthouse
```

## Privacidad y limitaciones

La aplicación no solicita nombre, correo, teléfono ni cuenta. La ubicación es
opcional. Los reportes y fotografías permanecen en IndexedDB dentro del
navegador; borrar los datos del sitio también elimina los reportes, folios,
puntos e insignias.

La validación de fotografías usa los metadatos que proporciona el navegador y
no sustituye una validación de seguridad en servidor. El MVP tampoco incluye
sincronización, respaldo, seguimiento institucional ni cambio remoto de estado.

## Verificación

La matriz completa está en `documentacion/pruebas-meta-1.7.md`. Lighthouse
13.4.1 obtuvo 100 en Rendimiento, Accesibilidad, Buenas prácticas y SEO, tanto
en la medición inicial como en la final. Esa versión de Lighthouse ya no expone
una categoría PWA independiente; por ello, manifest, Service Worker,
control offline e instalabilidad se verificaron por separado y no se inventó
una quinta puntuación.

## Repositorio

https://github.com/ciscooceguera/pwa-participacion-ciudadana
