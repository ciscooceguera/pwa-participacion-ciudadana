# PWA de Participación Ciudadana

MVP en construcción de una aplicación web progresiva para registrar problemas
urbanos de manera anónima. La información se conserva localmente en el
dispositivo mediante IndexedDB y no se envía a servidores externos.

## Estado actual

- HT-001: formulario de reporte completado.
- HT-002: gestor de reportes y generación de folio anónimo completados.
- HT-003: persistencia local con IndexedDB completada.

El flujo disponible permite:

- capturar categoría, descripción y evidencia fotográfica;
- solicitar ubicación de forma opcional;
- validar los campos requeridos;
- generar un folio con formato `PC-YYYYMMDD-XXXXXX`;
- almacenar el reporte, su evidencia y su estado inicial localmente;
- conservar los reportes después de recargar o cerrar el navegador.

Los reportes se crean con el estado `Registrado`.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- APIs estándar del navegador
- IndexedDB

No utiliza frameworks, backend, autenticación ni sincronización remota.

## Ejecución local

IndexedDB y las funciones PWA deben probarse mediante un servidor local, no
abriendo `index.html` directamente desde el sistema de archivos.

Con Python instalado:

```powershell
python -m http.server 8000
```

Después, abrir:

```text
http://localhost:8000
```

## Estructura principal

```text
index.html                    Interfaz del formulario
styles.css                    Presentación responsiva
app.js                        Validación e interacción con el usuario
js/reporte-service.js         Creación de folios y reportes
js/db.js                      Persistencia y consultas con IndexedDB
documentacion/                Bitácoras y documentación académica
evidencias/                   Capturas de pruebas manuales
```

## Privacidad y alcance local

La aplicación no solicita nombre, correo, teléfono ni cuenta. La ubicación es
opcional. Los datos y fotografías permanecen en IndexedDB dentro del navegador
y no se comparten entre dispositivos.

Eliminar los datos del sitio desde el navegador también elimina los reportes
almacenados localmente.

## Funciones pendientes del MVP

- consulta local mediante folio;
- participación básica mediante puntos e insignias;
- validación ampliada de evidencia fotográfica;
- Web App Manifest, Service Worker, funcionamiento offline e instalación;
- auditoría Lighthouse y documentación final.

## Repositorio

https://github.com/ciscooceguera/pwa-participacion-ciudadana
