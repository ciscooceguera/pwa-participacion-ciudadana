# Bitácora de implementación con IA

## Sesión 1

**Fecha:** 1 de septiembre de 2026
**Historia seleccionada:** HT-001 — Implementar el Formulario de Reporte
**Herramienta de IA:** ChatGPT
**Modelo utilizado:** GPT-5.6 Sol

## Tecnologías

* HTML5
* CSS3
* JavaScript vanilla
* APIs estándar del navegador
* Git y GitHub
* Python HTTP Server para ejecución local

## Estado inicial

Se creó el repositorio de GitHub y se preparó la estructura base del proyecto.

**Repositorio:**

https://github.com/ciscooceguera/pwa-participacion-ciudadana

La estructura inicial contenía:

* `index.html`
* `styles.css`
* `app.js`
* `README.md`
* `.gitignore`
* `documentacion/bitacora-ia.md`
* `evidencias/.gitkeep`

La preparación inicial fue registrada mediante el commit:

```text
a43f1d2 chore: preparar estructura inicial del proyecto
```

---

# Prompt 1 — Generación inicial

## Tipo de prompt

Generación de la primera versión funcional de HT-001.

## Prompt utilizado

```text
Contexto:

Estoy implementando la historia técnica HT-001 "Implementar el Formulario de Reporte" para el primer incremento funcional de una PWA de participación ciudadana.

El proyecto ya contiene los archivos index.html, styles.css y app.js. La responsabilidad de esta historia pertenece principalmente a la capa de Presentación. Su objetivo es permitir que un ciudadano documente un problema urbano y entregue los datos capturados a un futuro Gestor de Reportes.

Tecnologías:

- HTML5
- CSS3
- JavaScript vanilla
- APIs estándar del navegador
- Sin frameworks

Requerimiento específico:

Genera el código completo para index.html, styles.css y app.js.

La interfaz debe permitir:

1. Capturar la categoría del problema mediante un campo de texto.
2. Capturar una descripción mediante un textarea.
3. Seleccionar una imagen como evidencia mediante input type="file".
4. Solicitar la ubicación mediante un botón independiente.
5. Mantener la ubicación como un dato opcional.
6. Mostrar al usuario si la ubicación fue obtenida, denegada o no está disponible.
7. Validar que categoría, descripción y evidencia estén presentes antes de registrar.
8. Evitar la recarga de la página al enviar el formulario.
9. Construir un objeto JavaScript que contenga categoria, descripcion, evidencia y ubicacion.
10. Enviar el objeto a una función simulada llamada registrarReporteSimulado(datos).
11. Mostrar una confirmación con el folio devuelto por la función simulada.
12. Utilizar un diseño responsivo que pueda visualizarse en computadora y teléfono.

Restricciones:

- La ubicación no debe ser obligatoria.
- No implementar IndexedDB todavía.
- No implementar backend.
- No implementar autenticación.
- No agregar puntos, insignias ni seguimiento.
- No agregar datos personales.
- No utilizar frameworks.
- No utilizar eval.
- No utilizar innerHTML para mostrar contenido ingresado por el usuario.
- La interfaz no debe generar directamente el folio definitivo.
- No modificar README.md ni los archivos de documentación.
- No crear archivos adicionales.

Formato esperado:

Devuelve la solución separada en tres bloques completos:

1. index.html
2. styles.css
3. app.js

Después del código, explica brevemente la responsabilidad de cada función de JavaScript y señala cualquier limitación de esta primera versión.
```

## Resultado del Prompt 1

El prompt produjo una primera versión funcional separada en `index.html`, `styles.css` y `app.js`.

La aplicación permitió:

* Capturar la categoría del problema.
* Capturar una descripción.
* Seleccionar una evidencia fotográfica.
* Solicitar la ubicación mediante la Geolocation API.
* Continuar cuando la ubicación no estaba disponible.
* Construir un objeto con los datos capturados.
* Entregar el objeto a `registrarReporteSimulado(datos)`.
* Mostrar un folio demostrativo.
* Visualizar el formulario en computadora y teléfono.

## Revisión estática

Se ejecutó:

```powershell
git diff --check
```

El comando terminó sin mostrar resultados, por lo que no se detectaron errores de espacios en blanco o formato reconocibles por Git.

No se utilizó Node.js porque no estaba instalado en el equipo. La validación funcional de JavaScript se realizó directamente en Chrome mediante la consola de desarrollo.

## Pruebas de la primera versión

### Prueba 1 — Registro válido

Se introdujeron categoría, descripción y evidencia fotográfica válidas.

**Resultado:** exitoso.

La aplicación mostró:

```text
Reporte recibido correctamente. Folio: DEMO-HT001
```

El objeto enviado al gestor simulado contenía categoría, descripción, evidencia y `ubicacion: null`.

### Prueba 2 — Campos requeridos vacíos

Se intentó registrar sin categoría, descripción ni evidencia.

**Resultado:** exitoso.

La aplicación rechazó el registro y mostró un mensaje indicando que era necesario completar la información.

### Prueba 3 — Ubicación denegada

Se bloqueó el permiso de ubicación desde Chrome y se intentó registrar un reporte con los demás datos válidos.

**Resultado:** exitoso.

La aplicación mostró:

```text
No fue posible obtener la ubicación. Puedes continuar sin ella.
```

Posteriormente permitió registrar el reporte con:

```text
ubicacion: null
```

### Prueba 4 — Caracteres especiales y descripción amplia

Se utilizaron caracteres como:

```text
¡ ! # / ¿ ?
```

**Resultado:** exitoso.

Los caracteres se conservaron como texto normal y no se produjeron errores de JavaScript.

### Verificación de consola

La consola mostró el objeto enviado a `registrarReporteSimulado(datos)` y no presentó errores rojos relacionados con la aplicación.

## Limitaciones identificadas en la primera versión

* Utilizaba un solo mensaje general para los campos incompletos.
* No validaba explícitamente con JavaScript que la evidencia fuera una imagen.
* No mostraba el nombre del archivo seleccionado.
* No impedía múltiples envíos mientras se procesaba el reporte.
* No incorporaba un contador de caracteres.
* No recuperaba automáticamente el foco después del registro.
* El folio era solamente demostrativo.
* No existía persistencia local.

## Análisis crítico del Prompt 1

El primer prompt funcionó porque especificó las tecnologías, el alcance y las restricciones del incremento. Esto evitó que la IA agregara frameworks, backend, autenticación o persistencia.

La respuesta respetó la condición principal de HT-001: la ubicación permaneció opcional.

Sin embargo, la primera versión podía mejorar su retroalimentación al usuario. Un solo mensaje general no permitía identificar con precisión qué campo necesitaba corregirse. También resultaba conveniente prevenir envíos duplicados y mostrar información sobre la evidencia seleccionada.

No se identificaron APIs inventadas. La solución utilizó APIs reales del navegador:

* DOM API.
* File API mediante `input type="file"`.
* Geolocation API.
* Promesas de JavaScript.

---

# Prompt 2 — Refinamiento

## Tipo de prompt

Refinamiento de validación, robustez y experiencia de uso.

## Prompt utilizado

```text
Contexto:

Ya implementé y probé una primera versión de la historia técnica HT-001 "Implementar el Formulario de Reporte" para una PWA de participación ciudadana.

La aplicación utiliza HTML5, CSS3 y JavaScript vanilla. La primera versión permite capturar categoría, descripción, evidencia fotográfica y ubicación opcional. También construye un objeto y lo entrega a registrarReporteSimulado(datos).

Durante las pruebas manuales se identificaron oportunidades de mejora en la validación y la retroalimentación de la interfaz.

Objetivo:

Refina la implementación existente sin cambiar el alcance de HT-001.

Genera nuevamente el código completo para index.html, styles.css y app.js incorporando únicamente estas mejoras:

1. Mostrar un mensaje de error individual junto a categoría, descripción y evidencia cuando falte información.
2. Eliminar el error correspondiente cuando el usuario corrija el campo.
3. Validar que el archivo seleccionado sea una imagen.
4. Mostrar el nombre de la evidencia seleccionada.
5. Añadir un contador de caracteres para la descripción, sin imponer un límite máximo.
6. Mantener claramente los estados de ubicación:
   - ubicación no solicitada;
   - ubicación obtenida;
   - ubicación denegada o no disponible.
7. Mantener la ubicación opcional en todos los casos.
8. Evitar solicitudes duplicadas mientras se procesa el registro.
9. Deshabilitar temporalmente el botón Registrar mientras se procesa la solicitud.
10. Utilizar textContent para todos los mensajes dinámicos.
11. Después de un registro exitoso, limpiar el formulario, reiniciar los estados y devolver el foco al campo categoría.
12. Conservar el diseño responsivo para computadora y teléfono.

Restricciones:

- No implementar IndexedDB.
- No implementar backend.
- No implementar autenticación.
- No agregar puntos, insignias ni seguimiento.
- No agregar datos personales.
- No utilizar frameworks.
- No utilizar eval.
- No utilizar innerHTML para contenido dinámico.
- No convertir la ubicación en obligatoria.
- No generar el folio definitivo desde la interfaz.
- registrarReporteSimulado(datos) debe continuar representando al futuro Gestor de Reportes.
- No modificar README.md.
- No modificar archivos dentro de documentacion o evidencias.
- No crear archivos adicionales.

Formato esperado:

Devuelve la solución separada en tres bloques completos:

1. index.html
2. styles.css
3. app.js

Después del código, resume qué cambió respecto a la primera versión y señala las limitaciones que todavía permanecen.
```

## Resultado del Prompt 2

El segundo prompt refinó los tres archivos sin cambiar el alcance de HT-001.

Se incorporaron:

* Errores individuales para categoría, descripción y evidencia.
* Eliminación del error correspondiente al corregir cada campo.
* Validación del tipo de archivo.
* Visualización del nombre de la evidencia.
* Contador de caracteres.
* Estados claros para la ubicación.
* Prevención de solicitudes duplicadas.
* Desactivación temporal del botón de registro.
* Mensaje `Registrando...`.
* Reinicio completo del formulario después del éxito.
* Recuperación del foco en categoría.
* Uso de `textContent` para los mensajes dinámicos.

## Pruebas de la versión refinada

### Prueba 5 — Validación individual

Se intentó registrar el formulario vacío.

**Resultado:** exitoso.

Se mostraron los mensajes:

```text
La categoría es obligatoria.
La descripción es obligatoria.
Debes seleccionar una evidencia fotográfica.
Revisa los campos marcados antes de continuar.
```

### Prueba 6 — Corrección de campos

Se corrigieron individualmente la categoría, la descripción y la evidencia.

**Resultado:** exitoso.

Cada mensaje de error desapareció al corregir su campo correspondiente. El contador de caracteres se actualizó y se mostró el nombre de la imagen seleccionada.

### Prueba 7 — Registro refinado

Se registró un reporte válido utilizando la segunda versión.

**Resultado:** exitoso.

Durante el procesamiento, el botón se deshabilitó temporalmente. Después del registro:

* Se mostró el folio demostrativo.
* Se limpiaron los campos.
* El contador regresó a cero.
* El estado de evidencia se reinició.
* La ubicación regresó a no solicitada.
* El foco volvió al campo categoría.
* No se presentaron errores de JavaScript.

## Análisis crítico del Prompt 2

El segundo prompt fue más preciso porque se basó en problemas observados durante las pruebas de la primera versión.

En lugar de solicitar una solución nueva sin dirección, se indicaron mejoras concretas y se especificaron las decisiones que debían mantenerse. Esto ayudó a conservar la ubicación opcional y a evitar que la IA agregara funciones fuera del incremento.

La prevención de envíos duplicados y los mensajes por campo mejoraron la robustez sin trasladar responsabilidades del futuro Gestor de Reportes a la interfaz.

La validación del tipo MIME mejora la retroalimentación, aunque depende de la información proporcionada por el navegador y no sustituye una validación definitiva en una futura capa de negocio o backend.

---

# Modificaciones y decisiones humanas

Después de revisar el código generado por IA, se conservaron las siguientes decisiones:

| Decisión                           | Justificación                                                         |
| ---------------------------------- | --------------------------------------------------------------------- |
| Mantener la ubicación opcional     | Es una condición de HT-001.                                           |
| Mantener el gestor como simulación | El Gestor de Reportes definitivo pertenece a otra historia.           |
| No implementar IndexedDB           | La persistencia corresponde a un incremento posterior.                |
| Utilizar `textContent`             | Evita insertar HTML dinámico innecesario.                             |
| Validar cada campo por separado    | Mejora la comprensión de los errores.                                 |
| Prevenir solicitudes duplicadas    | Evita registros accidentales repetidos.                               |
| Mantener un folio demostrativo     | Permite probar la respuesta sin generar el folio definitivo en la UI. |
| Reiniciar el formulario            | Facilita iniciar un reporte nuevo.                                    |
| Recuperar el foco                  | Mejora la interacción mediante teclado.                               |

---

# Evidencias generadas

Las evidencias se almacenaron en la carpeta `evidencias`.

| Archivo                        | Contenido                                    |
| ------------------------------ | -------------------------------------------- |
| `01-repositorio-preparado.png` | Repositorio, estado inicial y primer commit. |
| `02-registro-valido.png`       | Registro con información válida.             |
| `03-campos-vacios.png`         | Rechazo de información incompleta.           |
| `04-ubicacion-denegada.png`    | Ubicación denegada sin bloquear el reporte.  |
| `06-caracteres-especiales.png` | Texto con caracteres especiales.             |
| `07-consola-sin-errores.png`   | Objeto registrado y consola sin errores.     |
| `08-validacion-refinada.png`   | Mensajes individuales de la segunda versión. |
| `09-registro-refinado.png`     | Registro exitoso con la versión refinada.    |

La ausencia de un archivo numerado como `05` no afecta el contenido ni la validez de las evidencias.

---

# Limitaciones de la implementación

La versión desarrollada corresponde únicamente al primer incremento de HT-001.

Todavía no incluye:

* Persistencia con IndexedDB.
* Backend.
* Autenticación.
* Sincronización en la nube.
* Seguimiento del reporte.
* Puntos o insignias.
* Gestor de Reportes definitivo.
* Generación definitiva de folios.
* Validación de archivos en servidor.

`registrarReporteSimulado(datos)` solamente representa la futura integración con el Gestor de Reportes.

---

# Aprendizajes sobre el uso de IA

La actividad demostró que un prompt debe incluir contexto, tecnologías, requerimientos, restricciones y formato esperado.

Una petición genérica puede producir código funcional, pero también puede agregar tecnologías o responsabilidades que no pertenecen al incremento. Las restricciones fueron necesarias para mantener la solución dentro del MVP.

También se comprobó que el desarrollo asistido por IA requiere revisión humana. La primera respuesta funcionó, pero las pruebas permitieron identificar problemas de usabilidad y robustez que dieron origen al segundo prompt.

El segundo prompt produjo un mejor resultado porque indicó tanto lo que debía modificarse como lo que debía permanecer igual.

---

# Tiempo de implementación

**Tiempo aproximado:** 120 minutos.

El tiempo incluyó:

* Preparación del repositorio.
* Generación inicial.
* Revisión del código.
* Pruebas manuales.
* Refinamiento.
* Documentación.
* Captura de evidencias.

# Satisfacción con el proceso

**Satisfacción:** 4 de 5.

La IA permitió generar rápidamente una base funcional y proponer mejoras útiles. Sin embargo, fue necesario revisar el código, comprobarlo en el navegador y controlar cuidadosamente el alcance.

# Conclusión

Se implementó el primer incremento funcional de HT-001 mediante HTML, CSS y JavaScript vanilla.

El formulario permite capturar categoría, descripción y evidencia fotográfica, además de solicitar ubicación de manera opcional. La aplicación valida los campos requeridos, proporciona retroalimentación individual, evita envíos duplicados y entrega los datos a un gestor simulado.

Los dos prompts muestran un proceso iterativo: primero se produjo una versión funcional y después se refinó a partir de resultados observados en pruebas reales.

El resultado mantiene separadas las responsabilidades de la interfaz, el futuro Gestor de Reportes y la persistencia, respetando el alcance del MVP.
