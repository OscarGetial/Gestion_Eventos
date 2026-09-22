# Trazabilidad y Gestión en Jira

## Proyecto Scrum

**Jira:** https://uceva-team-gbg1xixs.atlassian.net/jira/software/projects/SCRUM/boards/1/timeline

## Épica

**EP-01 — Home Page de gestión de eventos**

### HU-01 — Visualizar la Home Page

**Como** visitante, **quiero** visualizar una página principal clara y responsiva, **para** conocer y acceder a las funciones de gestión de eventos.

**Criterios de aceptación**
- La página se adapta a móvil, tablet y escritorio.
- La navegación es clara.
- El CTA principal permite acceder a la sección de creación.
- La información principal es legible y jerarquizada.

**Tareas**
- T-01 Crear estructura semántica HTML5.
- T-02 Diseñar hero, estadísticas y CTA.
- T-03 Construir sección de características.
- T-04 Construir listado de próximos eventos.

**Subtareas**
- ST-01.1 Crear `header` y navegación.
- ST-01.2 Crear sección hero.
- ST-01.3 Crear tarjetas de indicadores.
- ST-01.4 Crear sección de características.
- ST-01.5 Crear sección de eventos.
- ST-01.6 Crear footer.

### HU-02 — Aplicar diseño Mobile-First

**Como** usuario móvil, **quiero** que la interfaz funcione correctamente en pantallas pequeñas, **para** gestionar eventos desde mi teléfono.

**Tareas**
- T-05 Crear estilos base para móvil.
- T-06 Incorporar media queries para pantallas ≥700px.
- T-07 Verificar legibilidad, espaciado y navegación.

**Subtareas**
- ST-02.1 Definir variables CSS.
- ST-02.2 Ajustar grids y tipografía.
- ST-02.3 Revisar botones y tarjetas.
- ST-02.4 Probar viewport móvil y escritorio.

### HU-03 — Interacción de navegación

**Como** usuario, **quiero** abrir/cerrar el menú en móvil, **para** navegar sin ocupar permanentemente la pantalla.

**Tareas**
- T-08 Implementar botón de menú.
- T-09 Añadir estado `aria-expanded`.
- T-10 Validar interacción básica.

## Matriz de trazabilidad

| ID | Tipo | Entregable | Archivo |
|---|---|---|---|
| EP-01 | Épica | Home Page | Proyecto completo |
| HU-01 | Historia | Home Page | `index.html` |
| HU-02 | Historia | Responsive Mobile-First | `css/styles.css` |
| HU-03 | Historia | Menú móvil | `js/main.js` |
| T-01..T-10 | Tareas | Implementación | HTML/CSS/JS |
| ST-01.1..ST-02.4 | Subtareas | Componentes y pruebas | HTML/CSS/JS |

## Enlace de evidencia Jira

https://uceva-team-gbg1xixs.atlassian.net/jira/software/projects/SCRUM/boards/1/timeline
