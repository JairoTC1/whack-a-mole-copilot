# Ejemplo: configuración de un Custom Agent para Copilot

Este archivo muestra un ejemplo de configuración y uso recomendado para un agente (chat mode) personalizado.

Ejemplo de metadatos (informativo):

{
  "name": "awesome-copilot-focused",
  "displayName": "Awesome Copilot — Focused Dev Agent",
  "description": "Agente orientado a tareas de desarrollo: pruebas, refactor y generación de snippets.",
  "recommendedPrompts": [
    "Genera pruebas unitarias para `script.js`.",
    "Refactoriza la función X para mejorar legibilidad y añadir tests.",
    "Crea un fixture de test y su mock de dependencia Y."
  ]
}

Uso recomendado:

- Instalación: seguir los pasos en `docs/copilot-agent-install.md`.
- Selección: abrir Copilot Chat y elegir el agente por su `displayName`.
- Prompts: empieza con una instrucción clara y el archivo objetivo, por ejemplo: "Genera tests Jest para `script.js`".

Notas:
- Este archivo es solo un ejemplo; los agentes reales pueden tener formatos y requisitos distintos.
- No incluir tokens, claves ni datos sensibles en archivos del repo.
