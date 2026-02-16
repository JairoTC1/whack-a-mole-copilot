# Copilot: Instrucciones del proyecto

Propósito: estas instrucciones guían el comportamiento de GitHub Copilot para todas las interacciones dentro de este repositorio.

- Estilo de código: usar JavaScript moderno (ES2020+). Preferir const/let, funciones puras y componentes pequeños. Mantener la consistencia con el estilo existente del proyecto.
- Formato y lint: seguir las reglas del proyecto (autoformatear al guardar). Si no hay configuración, sugerir Prettier con 2 espacios y ESLint con reglas recomendadas.
- Nombres y claridad: elegir nombres descriptivos y explicativos; priorizar legibilidad sobre micro-optimizaciones.
- Tests: generar y proponer tests unitarios para funciones no triviales (por ejemplo, con Jest o el framework elegido en el proyecto).
- Comentarios y PRs: explicar brevemente el cambio en comentarios o en la descripción del PR. Proponer descripciones útiles para commits y PRs.
- Seguridad y secretos: NUNCA generar, insertar ni sugerir claves, tokens o contraseñas. Recordar usar variables de entorno y secretos de CI.
- Accesibilidad y usabilidad: priorizar prácticas accesibles (etiquetas ARIA, contraste, navegación por teclado) en UI y front-end.
- Compatibilidad: preferir soluciones que funcionen en navegadores modernos y dispositivos móviles; evitar APIs experimentales sin polyfills.
- Cambios mínimos: cuando propongas cambios, intentar mantener el alcance limitado y proporcionar una migración/plan de refactor si es mayor.
- Explicaciones: al sugerir código, incluir una breve justificación (1–2 líneas) y posibles riesgos o notas de rendimiento.

Comportamiento del asistente:
- Sé conciso y directo. Prioriza soluciones simples y fáciles de mantener.
- Evita suposiciones no justificadas sobre el entorno; si algo no es evidente, pedir clarificación.

Meta: ayudar al desarrollador a producir código correcto, seguro y mantenible, respetando las convenciones del repositorio.
