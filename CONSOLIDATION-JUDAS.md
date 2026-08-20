# JUDAS Consolidado

Esta rama toma `belentani-judas-era-omega` como base funcional porque contiene una aplicación React/Vite con servidor, pruebas, persistencia, rutas y estilos propios de JUDAS ERA. No se elimina ninguna versión.

## Fuentes conservadas

| Fuente | Aporte identificado | Tratamiento |
|---|---|---|
| `belentani-judas-era-omega` | Base OMEGA funcional, experiencia principal, servidor y pruebas | Base activa de la consolidación |
| `belentani-judas-monograph` | Componentes editoriales, archivo, psicología, timeline, galería, sintetizador y datos narrativos | Conservado como módulo fuente separado para integración posterior controlada |
| `judas-scifi-experience` | Componentes y experiencia sci-fi alternativa | Conservado como versión independiente |
| `belentani-judas-escape-mobile` | Light Room, HTML móvil, CSS, JavaScript y audio `judas-demo.mp3` | Conservado como experiencia estática y asset propio |
| `belentani-omega-template` | Archivo, portal, studio, assets y documentos OMEGA | Conservado como material visual/documental relacionado |
| `BELENTANI-JUDAS-ERA-FULLSTACK` | Experiencia `20 WORLDS`, backend, tests y assets audiovisuales | No se copia automáticamente por su volumen y arquitectura distinta; queda referenciado para revisión especializada |
| `BELENTANI-BUILDAI-HTML-Y-FOTOS` | 28 HTML y 301 assets visuales, incluyendo varias capturas Judas | No se copia automáticamente; se conserva en su repositorio original y queda catalogado |

## Regla de integración

Los módulos preservados no se importan automáticamente en la aplicación OMEGA. Cada integración deberá pasar por revisión de dependencias, rutas, assets, accesibilidad y pruebas. Esto evita que una versión reemplace silenciosamente a otra o que se mezclen arquitecturas.
