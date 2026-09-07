# Pruebas finales y auditoría — Meta 1.7

## Entorno de verificación

| Elemento | Valor |
| --- | --- |
| Fecha de ejecución | 6 de septiembre de 2026 (zona America/Tijuana) |
| Navegador | Google Chrome 152.0.7977.76 |
| Servidor local | Python HTTP Server en `http://127.0.0.1:4173` |
| Lighthouse | 13.4.1, ejecución de escritorio |
| Persistencia | IndexedDB del navegador |
| Repositorio | `https://github.com/ciscooceguera/pwa-participacion-ciudadana` |

## Matriz de pruebas funcionales

| ID | Escenario | Resultado esperado | Resultado |
| --- | --- | --- | --- |
| PF-01 | Abrir la pantalla principal | Se muestran registro, participación y consulta sin errores visibles | Aprobada |
| PF-02 | Enviar los campos requeridos vacíos | Se muestran errores individuales y el foco llega al primer campo inválido | Aprobada |
| PF-03 | Registrar categoría, descripción y fotografía válidas | Se crea un reporte con estado `Registrado` y se muestra un folio único | Aprobada |
| PF-04 | Recargar después de registrar | El reporte permanece en IndexedDB y la participación se recalcula | Aprobada |
| PF-05 | Consultar un folio existente | Se presentan folio, categoría, descripción, estado, fecha, ubicación y evidencia | Aprobada |
| PF-06 | Consultar un folio con formato inválido | La consulta se bloquea y explica el formato requerido | Aprobada |
| PF-07 | Consultar un folio válido inexistente | Se informa que no existe en este dispositivo | Aprobada |
| PF-08 | Denegar o no proporcionar ubicación | El reporte puede registrarse con ubicación opcional vacía | Aprobada |
| PF-09 | Intentar dos envíos simultáneos | El botón se deshabilita y no se duplica el registro durante el proceso | Aprobada |
| PF-10 | Seleccionar JPG, PNG o WebP de hasta 5 MB | La evidencia es aceptada y se muestra su nombre | Aprobada |
| PF-11 | Seleccionar archivo vacío, formato distinto o mayor de 5 MB | La evidencia se rechaza con un mensaje específico | Aprobada |
| PF-12 | Acumular reportes | Se suman 10 puntos por reporte y se activan insignias en 1, 3 y 5 reportes | Aprobada |
| PF-13 | Abrir con ancho móvil de 390 px | La interfaz se reorganiza sin desbordamiento horizontal | Aprobada |
| PF-14 | Recargar con la red bloqueada después de una visita online | El Service Worker abre el shell y permite consultar los datos locales | Aprobada |
| PF-15 | Revisar manifest y Service Worker | Manifest sin errores, Service Worker activo y caché `participacion-ciudadana-v3` | Aprobada |
| PF-16 | Revisar errores inesperados de consola durante el flujo | No aparecen errores inesperados atribuibles a la aplicación | Aprobada |

## Evidencias funcionales

| Archivo | Evidencia |
| --- | --- |
| `evidencias/meta-1.7/01-pantalla-principal.png` | Pantalla principal del MVP terminado |
| `evidencias/meta-1.7/02-registro-exitoso.png` | Registro correcto y folio generado |
| `evidencias/meta-1.7/03-consulta-folio.png` | Recuperación local de un reporte por folio |
| `evidencias/meta-1.7/04-participacion-local.png` | Puntos e insignias calculados desde IndexedDB |
| `evidencias/meta-1.7/05-validacion-archivo.png` | Rechazo de evidencia que supera el límite |
| `evidencias/meta-1.7/06-funcionamiento-offline.png` | Consulta disponible con la red bloqueada |
| `evidencias/meta-1.7/07-vista-movil.png` | Presentación responsiva con ancho móvil |

## Auditoría Lighthouse

| Categoría | Inicial | Final | Variación |
| --- | ---: | ---: | ---: |
| Rendimiento | 100 | 100 | 0 |
| Accesibilidad | 100 | 100 | 0 |
| Buenas prácticas | 100 | 100 | 0 |
| SEO | 100 | 100 | 0 |

Lighthouse 13.4.1 no ofrece una categoría PWA independiente, por lo que no se
reporta ni se infiere una puntuación PWA. La capacidad progresiva se comprobó
por separado: manifest válido, Service Worker controlador, recursos en caché,
apertura sin red y consulta de IndexedDB offline. La automatización de Chrome
se ejecutó en un contexto privado y por ello la API de instalabilidad indicó
`in-incognito`; esto es una restricción de ese contexto de prueba, no un error
del manifest. La instalación debe comprobarse en una ventana normal compatible.

No hubo auditorías con puntuación fallida. Lighthouse mostró oportunidades
informativas sin peso en la calificación, relacionadas con recursos que bloquean
el renderizado, vida útil de caché y compresión/minificación. Parte de ellas
depende de las cabeceras del servidor local de Python. Después de la medición
inicial se retiró la impresión del objeto completo del reporte en consola, se
mejoró el foco ante validación, se agregó `aria-busy` a operaciones y se reforzó
la actualización segura de caché del Service Worker.

## Evidencias de auditoría

| Archivo | Evidencia |
| --- | --- |
| `evidencias/lighthouse/01-lighthouse-inicial.png` | Puntuaciones de la ejecución inicial |
| `evidencias/lighthouse/02-diagnosticos-lighthouse.png` | Diagnósticos informativos observados |
| `evidencias/lighthouse/03-correcciones-aplicadas.png` | Resumen verificable de correcciones aplicadas |
| `evidencias/lighthouse/04-prueba-offline.png` | Validación de funcionamiento sin conexión |
| `evidencias/lighthouse/05-lighthouse-final.png` | Puntuaciones de la ejecución final |

Los reportes completos reproducibles se conservan en HTML y JSON dentro de
`evidencias/lighthouse/`. La ejecución inicial se registró el 7 de septiembre
de 2026 a las 05:40:32 UTC y la final a las 05:46:31 UTC.

## Conclusión

Todas las pruebas funcionales definidas para el MVP fueron aprobadas. La
aplicación registra y consulta reportes locales, conserva evidencia, calcula la
participación, funciona de forma responsiva y mantiene disponible su shell y los
datos locales sin conexión. Sus límites —sin backend, sincronización, cuentas o
seguimiento institucional— permanecen explícitos y corresponden al alcance
académico adoptado.
