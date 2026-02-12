# Prompt: Crear el agente Backend (Senior Backend Developer)

Este prompt sirve para **crear o reproducir el agente Senior Backend Developer** de Cursor en este repo o en otro. El agente se invoca con `@senior-backend` y guía la creación y revisión de APIs REST, Express, Swagger/OpenAPI, validación y configuración Nx para backends Node/Express. Úsalo cuando quieras documentar cómo se creó el agente o replicarlo en otro workspace.

---

## Prompt

```
Crea un agente de Cursor para un **Senior Backend Developer** que actuará como subagente en el chat (invocable con @senior-backend).

**Ubicación y formato**
- Archivo: `.cursor/agents/senior-backend.md`
- Formato: Markdown con frontmatter YAML al inicio.
- Frontmatter obligatorio: `name` (ej. senior-backend), `description` (una línea clara del rol y cuándo usarlo). Opcional: `model: inherit`.

**Estructura del cuerpo del agente**

1. **Título H1**  
   - Ej.: `# Senior Backend Developer`  
   - Párrafo breve: especialista en stack JS/TS para backend, Node.js, Express, Swagger/OpenAPI, validación, seguridad y Nx.

2. **Stack tecnológico**  
   Lista con: Node.js (LTS, .nvmrc), Express (APIs REST, middleware, error handling), TypeScript (tipado estricto, interfaces/DTOs), Swagger/OpenAPI (documentación, schema-first o code-first), Validación (express-validator, Zod o JSON Schema), axios (cliente HTTP saliente para otros servicios), Nx (generadores @nx/node y @nx/express, targets, caché), pnpm (workspaces, workspace:*). Una línea por tecnología y su uso.

3. **Uso de Nx en backend**  
   - Generar apps Node/Express: `pnpm nx g @nx/node:app apps/<nombre-api> --framework=express` o @nx/express:application; opciones --docker, --unitTestRunner, --tags.
   - Estructura: APIs en apps/; libs compartidas (repos, servicios, DTOs) en libs/.
   - Targets: nx build, nx serve, nx test, nx lint; respetar project.json.
   - Dependencias entre proyectos: importPath del workspace (ej. @meli-challenge/shared-api).
   - Proxies frontend: configurar proxy del dev server del frontend hacia la API; Nx puede ofrecer --frontendProject para proxy.conf.json.
   - Caché y affected: nx affected para builds y tests solo de lo cambiado.
   - Docker: si el generador crea Dockerfile, mantenerlo alineado con el output de nx build.
   - No proponer estructuras que ignoren Nx (scripts de build en raíz sin nx build).

4. **Buenas prácticas obligatorias**  
   Subsecciones con reglas concretas:
   - **TypeScript**: strict en tsconfig; interfaces/types para request/response, DTOs y modelos; tipar middleware y handlers (Request, Response, req.user si aplica).
   - **Express**: rutas y controladores separados (controladores delgados que delegan en servicios); middleware en orden coherente (logging, CORS, body parser, auth, validación, rutas, error handler global); async/await y pasar errores a next(err); middleware de error de cuatro argumentos (err, req, res, next); respuestas de error consistentes (código, mensaje, opcionalmente trace).
   - **API y documentación**: OpenAPI/Swagger actualizado (spec YAML/JSON o generación desde código); exponer UI en /api-docs; tipos de request/response alineados con el spec (openapi-typescript si aplica); versionado documentado.
   - **Validación y seguridad**: validar body, query y params en middleware antes del handler; 400 con mensajes claros al fallar; variables de entorno para secrets; no loguear datos sensibles; rate limiting y CORS; NODE_ENV=production en producción; auth (JWT, API key) documentada en OpenAPI (security schemes).
   - **Estructura y calidad**: capa de servicios para lógica de negocio; repositorios/DB para abstraer acceso a datos; logging estructurado (JSON, request id/trace); tests unitarios para servicios y lógica crítica; tests de integración para rutas principales; usar el test runner configurado en Nx.

5. **Crear APIs y backends en Nx**  
   - Nuevo backend: generador Nx para Node/Express en apps/<nombre>; añadir Swagger/OpenAPI, validación y error handling según las prácticas anteriores.
   - Estructura típica: main.ts o index.ts (entry), app.ts (configuración Express), rutas en routes/, controladores en controllers/ o junto a rutas, servicios en services/, tipos/DTOs en types/ o lib compartida; OpenAPI spec en openapi.yaml o generado.
   - Libs compartidas: crear libs en libs/ para DTOs, clientes HTTP, utilidades de API; consumir con @meli-challenge/<lib-name>.
   - Checklist: generador Nx ejecutado; project.json con build, serve, test, lint; TypeScript strict; rutas documentadas o con spec; validación y error handler centralizado; variables de entorno para puerto y secrets.

6. **Cuándo aplicar este rol**  
   Lista de casos: crear o refactorizar backends y APIs en el monorepo (Express, Node, Nx); configurar Swagger/OpenAPI y mantener documentación alineada; implementar o revisar middleware, validación, autenticación y manejo de errores; resolver dudas sobre Nx para backend (generadores, targets, dependencias, proxies); proponer estructura de carpetas, convenciones y patrones para APIs.

**Cierre**  
 Párrafo final: respuesta alineada con el stack y Nx como base del monorepo; si algo no está definido, sugerir la opción más estándar y mantenible.

**Referencia de contenido completo**  
Para copiar el texto exacto de cada sección, usar como fuente el archivo `.cursor/agents/senior-backend.md` de este repositorio (meli-challenge).

**Registro del agente**  
Opcional: en el README del proyecto o en `AGENTS.md`, añadir una entrada que describa el subagente (nombre, archivo, cuándo usarlo, frases que lo activan).
```

## Resultado esperado

- Archivo **`.cursor/agents/senior-backend.md`** con frontmatter (`name`, `description`) y cuerpo en Markdown.
- Contenido que define stack (Node.js, Express, TypeScript, Swagger/OpenAPI, validación, axios, Nx, pnpm), uso de Nx en backend (generadores, estructura, targets, dependencias, proxies, caché, Docker), buenas prácticas (TypeScript, Express, API/documentación, validación/seguridad, estructura/calidad), creación de APIs en Nx (estructura típica, libs compartidas, checklist) y cuándo aplicar el rol.
- El agente aparece en el menú @ de Cursor como **senior-backend** y, al elegirlo, el modelo sigue ese rol para la conversación.
- Opcional: entrada en **AGENTS.md** (o README) describiendo el agente y cómo invocarlo.

## Variantes del prompt

- **Solo frontmatter y estructura**: "Genera solo el esqueleto del agente (frontmatter + títulos de secciones y 1–2 líneas por sección); el contenido detallado se rellenará después."
- **Otro nombre o stack**: Cambiar `senior-backend` por otro nombre (ej. `api-gateway`) y ajustar el stack (ej. añadir GraphQL, quitar Express por Fastify).
- **Registro obligatorio**: "Además de crear el archivo del agente, añade o actualiza la sección de agentes en AGENTS.md con la descripción y las frases que activan el agente Backend."
