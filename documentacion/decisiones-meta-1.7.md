# Decisiones de implementación - Meta 1.7

Este documento registra decisiones del MVP que no estaban cuantificadas en los
documentos de la actividad. Su propósito es distinguir los requisitos originales
de las reglas elegidas durante la implementación.

## Participación local

Los documentos mencionan puntos e insignias, pero no definen cantidades ni
umbrales. Para completar el componente básico del MVP se adoptaron estas reglas:

| Elemento | Regla del MVP |
| --- | --- |
| Puntos | 10 puntos por cada reporte almacenado localmente |
| Primer Reporte | Se obtiene con 1 reporte |
| Observador Activo | Se obtiene con 3 reportes |
| Vecino Ejemplar | Se obtiene con 5 reportes |

Los puntos y las insignias se calculan a partir del número de reportes presentes
en IndexedDB. No se crean perfiles, cuentas, rankings ni información pública.
Eliminar los datos locales del navegador también reinicia este avance.
