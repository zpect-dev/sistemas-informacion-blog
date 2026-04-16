// ─────────────────────────────────────────────────────────────────────────────
//  posts.js  —  todas las entradas del blog en texto plano
// ─────────────────────────────────────────────────────────────────────────────

const posts = [
    {
        id: 1,
        slug: "modelando-requerimientos-control-vehiculos",
        title: 'Modelando los Requerimientos del Proyecto "Control-Vehículos"',
        date: "2026-03-15",
        category: "Técnica de levantamiento de información",
        excerpt:
            "Análisis profundo sobre la elaboración de prototipos y el modelado de casos de uso aplicado al sistema de gestión de flotas.",
        coverImage:
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
        content: `
      <h2>1. Elaboración de Prototipos de Identificación</h2>
      
      <blockquote>
        <strong>Síntesis Teórica:</strong> Según el Capítulo 5, la identificación de requerimientos busca descubrir lo que los usuarios necesitan del sistema. La elaboración de prototipos consiste en construir rápidamente un modelo a pequeña escala y funcional para descubrir o validar requerimientos.
      </blockquote>

      <h3>Aplicación en Control-Vehículos:</h3>
      <p>
        Dada la naturaleza móvil de nuestra aplicación, la adopción por parte de los conductores depende enteramente de la facilidad de uso de la interfaz en campo. No comenzaremos escribiendo código de producción para las interfaces; en su lugar, aplicamos esta técnica diseñando <strong>prototipos navegables de alta fidelidad</strong> centrados en el flujo de trabajo del Conductor.
      </p>
      
      <p>Al utilizar estos modelos funcionales a pequeña escala, logramos:</p>
      <ul>
        <li><strong>Validar la usabilidad en campo:</strong> Observamos si los conductores pueden completar el reporte diario de forma intuitiva.</li>
        <li><strong>Descubrir Requerimientos No Funcionales:</strong> Reveló la necesidad de gestionar un <em>caché local</em> para las fotos y compresión automática.</li>
      </ul>

      <hr>

      <h2>2. Construir el Diagrama de Modelos de Casos de Uso</h2>
      
      <blockquote>
        <strong>Síntesis Teórica:</strong> El Capítulo 6 se enfoca en cómo documentar y modelar requerimientos promoviendo el "desarrollo centrado en el usuario", identificando actores y tareas principales.
      </blockquote>

      <h3>Aplicación en Control-Vehículos:</h3>
      <p>
        Hemos definido dos actores principales: el <strong>Conductor</strong> (en campo) y el <strong>Administrador de Flota</strong> (en oficina).
      </p>

      <div class="my-10 p-6 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center">
        <h4 class="text-lg font-medium text-slate-300 mb-6 text-center">Diagrama de Casos de Uso: Sistema Control-Vehículos</h4>
        <div class="mermaid w-full flex justify-center">
            flowchart LR
                classDef actor fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#fff;
                classDef usecase fill:#2e1065,stroke:#a855f7,stroke-width:2px,color:#fff;
                classDef system fill:#0f172a,stroke:#475569,stroke-width:2px,stroke-dasharray: 5 5;

                Cond((Conductor)):::actor
                Admin((Administrador<br>de Flota)):::actor

                subgraph Sistema Control-Vehículos
                    direction TB
                    Auth([Autenticar Usuario]):::usecase
                    RepD([Subir reporte<br>diario de fluidos]):::usecase
                    RepS([Registrar estado<br>semanal de pieza]):::usecase
                    Obs([Enviar observación<br>o inquietud]):::usecase
                    Cons([Consultar estado<br>de flota en tiempo real]):::usecase
                    Alert([Revisar alertas<br>de mantenimiento]):::usecase
                end

                Cond --- RepD
                Cond --- RepS
                Cond --- Obs

                Admin --- Cons
                Admin --- Alert

                RepD -. "<< include >>" .-> Auth
                Cons -. "<< include >>" .-> Auth
        </div>
        <p class="text-xs text-slate-500 mt-6 text-center italic">Figura 1: Representación de las interacciones principales del sistema.</p>
      </div>

      <p>
        Como se observa en el diagrama, hemos modelado un caso de uso resumen transversal: <strong>"Autenticar Usuario"</strong>. Casos de uso críticos incluyen obligatoriamente (<code>&lt;&lt;include&gt;&gt;</code>) la autenticación, garantizando seguridad y trazabilidad.
      </p>
    `,
    },

    {
        id: 2,
        slug: "fases-modelizacion-control-vehiculos",
        title: 'Fases de Definición, Modelización y Control del Proyecto "Control-Vehículos"',
        date: "2026-03-15",
        category: "Investigación, Modelado y Documentación",
        excerpt:
            "Investigación de hechos, DER dinámico, DFD, diagrama de red y estrategia de desarrollo RAD para el sistema de flota.",
        coverImage:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        content: `
      <h2>1. Fase de Definición: Investigación de Hechos</h2>
      <p>
        Antes del desarrollo técnico, es imperativo comprender la raíz del problema: altos costos operativos y falta de visibilidad en tiempo real del estado de los activos. Aplicamos el <strong>Desarrollo Conjunto de Aplicaciones (DCA)</strong> para asignar responsabilidades claras y definir requisitos basados en la realidad del campo.
      </p>
      
      <p><strong>Fuentes de Verdad Operativa:</strong></p>
      <ul>
        <li><strong>Observación Directa:</strong> Análisis del proceso de revisión de fluidos realizado por conductores en estaciones de servicio y garajes.</li>
        <li><strong>Entrevistas con Stakeholders:</strong> Sesiones con administradores de flota para identificar los cuellos de botella en la recepción de novedades.</li>
        <li><strong>Análisis de Activos:</strong> Categorización de las piezas críticas y fluidos esenciales que requieren registro fotográfico y audiovisual.</li>
      </ul>

      <hr>

      <h2>2. Fase de Modelización — El "Blueprint" del Sistema</h2>

      <div class="my-10 p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center overflow-x-auto">
        <div class="mermaid w-full">
          erDiagram
            users {
              bigint id PK
              string name
              string email
              string password
            }
            vehiculos {
              string placa PK
              string tipo
              string modelo
              string ubicacion
              bigint user_id FK
            }
            revisiones_diarias {
              bigint id PK
              string vehiculo_id FK
              bigint user_id FK
              boolean nivel_fluido
              string imagen
              string tipo
              datetime fecha_creacion
              boolean revisado
              datetime fecha_revision
            }
            revisiones_semanales {
              bigint id PK
              string vehiculo_id FK
              bigint user_id FK
              string observaciones
              string video
              datetime fecha_creacion
              boolean revisado
              datetime fecha_revision
            }
            especificaciones {
              bigint id PK
              string nombre
            }
            vehiculo_especificaciones {
              bigint id PK
              bigint user_id FK
              string vehiculo_id FK
              bigint especificacion_id FK
              string estado
              string observaciones
              datetime fecha_verificacion
            }
            accesorios {
              bigint id PK
              string nombre
            }
            vehiculo_accesorios {
              bigint id PK
              bigint user_id FK
              string vehiculo_id FK
              bigint accesorio_id FK
              boolean estado
              string observaciones
              datetime fecha_verificacion
            }
            piezas {
              bigint id PK
              string nombre
            }
            vehiculo_piezas {
              bigint id PK
              bigint user_id FK
              string vehiculo_id FK
              bigint pieza_id FK
              boolean estado
              string observaciones
              datetime fecha_verificacion
            }
            permisos {
              bigint id PK
              string nombre
            }
            vehiculo_permisos {
              bigint id PK
              bigint user_id FK
              string vehiculo_id FK
              bigint permiso_id FK
              boolean estado
              date fecha_expedicion
              date fecha_vencimiento
              string valor_texto
              datetime fecha_verificacion
            }

            users ||--o{ vehiculos : "administra"
            users ||--o{ revisiones_diarias : "registra"
            users ||--o{ revisiones_semanales : "registra"
            vehiculos ||--o{ revisiones_diarias : "tiene"
            vehiculos ||--o{ revisiones_semanales : "tiene"
            vehiculos ||--o{ vehiculo_especificaciones : "tiene"
            vehiculos ||--o{ vehiculo_accesorios : "tiene"
            vehiculos ||--o{ vehiculo_piezas : "tiene"
            vehiculos ||--o{ vehiculo_permisos : "tiene"
            especificaciones ||--o{ vehiculo_especificaciones : "catalogada en"
            accesorios ||--o{ vehiculo_accesorios : "catalogado en"
            piezas ||--o{ vehiculo_piezas : "catalogada en"
            permisos ||--o{ vehiculo_permisos : "catalogado en"
            users ||--o{ vehiculo_especificaciones : "verifica"
            users ||--o{ vehiculo_accesorios : "verifica"
            users ||--o{ vehiculo_piezas : "verifica"
            users ||--o{ vehiculo_permisos : "verifica"
        </div>
      </div>

      <hr>

      <h3>B. Modelado de Procesos — Diagrama de Flujo de Datos (DFD)</h3>
      <div class="my-10 p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center overflow-x-auto">
        <div class="mermaid w-full">
          flowchart LR
            classDef ext fill:#1e293b,stroke:#6366f1,color:#fff,stroke-width:2px
            classDef proc fill:#2e1065,stroke:#a855f7,color:#fff,stroke-width:2px,border-radius:50%

            Cond(["Conductor"]):::ext
            Admin(["Administrador"]):::ext
            SCV(["Sistema\nControl-Vehículos"]):::proc

            Cond -->|"Reportes diarios\nRevisiones semanales\nObservaciones"| SCV
            SCV -->|"Confirmación\nAlertas de revisión"| Cond
            Admin -->|"Asignaciones\nConfiguración de flota"| SCV
            SCV -->|"Dashboard de flota\nReportes generales\nAlertas de mantenimiento"| Admin
        </div>
      </div>

      <div class="my-10 p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center overflow-x-auto">
        <div class="mermaid w-full">
          flowchart TD
            classDef actor fill:#1e293b,stroke:#6366f1,color:#fff
            classDef proc fill:#2e1065,stroke:#a855f7,color:#fff
            classDef store fill:#0f172a,stroke:#64748b,color:#cbd5e1

            Cond(["Conductor"]):::actor
            Admin(["Administrador"]):::actor
            DB[("Base de Datos")]:::store

            P1["1. Autenticar\nUsuario"]:::proc
            P2["2. Registrar\nRevisión Diaria"]:::proc
            P3["3. Registrar\nRevisión Semanal"]:::proc
            P4["4. Gestionar\nFlota"]:::proc
            P5["5. Generar\nAlertas"]:::proc

            Cond -->|credenciales| P1
            P1 -->|sesión válida| P2
            P1 -->|sesión válida| P3
            Admin -->|credenciales| P1
            P1 -->|sesión admin| P4
            P2 -->|datos fluidos + imagen| DB
            P3 -->|observaciones + video| DB
            P4 -->|asignaciones, vehículos| DB
            DB -->|historial revisiones| P5
            P5 -->|alertas mantenimiento| Admin
            P5 -->|notificaciones pendientes| Cond
        </div>
      </div>

      <hr>

      <h3>C. Modelado de Redes — Diagrama de Conexión de Puestos</h3>
      <div class="my-10 p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center overflow-x-auto">
        <div class="mermaid w-full">
          flowchart TB
            classDef node fill:#1e293b,stroke:#6366f1,color:#fff
            classDef server fill:#2e1065,stroke:#a855f7,color:#fff
            classDef db fill:#0f172a,stroke:#64748b,color:#cbd5e1
            classDef cloud fill:#0c1a10,stroke:#22c55e,color:#86efac

            subgraph Campo["Nodo Campo (Conductor)"]
              direction LR
              Mov["App Móvil\n(Conductor)"]:::node
            end

            subgraph Oficina["Oficina (Administrador)"]
              direction LR
              Web["Panel Web\n(Administrador)"]:::node
            end

            subgraph Servidor["Servidor de Aplicación (Laravel)"]
              direction TB
              API["API RESTful\n(Laravel Routes)"]:::server
              Auth["Auth\n(Sanctum)"]:::server
              BL["Business Logic\n(Controllers + Services)"]:::server
            end

            subgraph Datos["Capa de Datos"]
              DB[("MySQL\nBase de Datos")]:::db
              Storage["Storage\n(Imágenes / Videos)"]:::db
            end

            Mov -- "HTTPS / JSON" --> API
            Web -- "HTTPS / JSON" --> API
            API --> Auth
            Auth --> BL
            BL --> DB
            BL --> Storage
            DB -.->|"Respuesta de datos"| BL
            Storage -.->|"URLs de archivos"| BL
            BL -.->|"JSON Response"| API
            API -.->|"HTTPS"| Mov
            API -.->|"HTTPS"| Web
        </div>
      </div>

      <hr>

      <h2>3. Fase de Control — El Diccionario de Proyecto</h2>
      <div class="my-6 overflow-x-auto rounded-xl border border-slate-700/50">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-800/80 text-violet-400 uppercase text-xs tracking-widest">
            <tr>
              <th class="px-4 py-3">Entidad / Flujo</th>
              <th class="px-4 py-3">Tipo</th>
              <th class="px-4 py-3">Descripción</th>
              <th class="px-4 py-3">Atributos Clave</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">vehiculos</td>
              <td class="px-4 py-3">Entidad Fuerte</td>
              <td class="px-4 py-3">Representa cada vehículo de la flota gestionada</td>
              <td class="px-4 py-3 font-mono text-xs">placa (PK), tipo, modelo, ubicacion</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">users</td>
              <td class="px-4 py-3">Entidad Fuerte</td>
              <td class="px-4 py-3">Usuarios del sistema (conductores y administradores)</td>
              <td class="px-4 py-3 font-mono text-xs">id (PK), name, email, password</td>
            </tr>
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">revisiones_diarias</td>
              <td class="px-4 py-3">Entidad Débil</td>
              <td class="px-4 py-3">Registro diario del nivel de fluidos con fotografía</td>
              <td class="px-4 py-3 font-mono text-xs">nivel_fluido, imagen, tipo, revisado</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">revisiones_semanales</td>
              <td class="px-4 py-3">Entidad Débil</td>
              <td class="px-4 py-3">Registro semanal del estado general del vehículo con video</td>
              <td class="px-4 py-3 font-mono text-xs">observaciones, video, revisado</td>
            </tr>
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">observaciones</td>
              <td class="px-4 py-3">Entidad Débil</td>
              <td class="px-4 py-3">Novedades e inconvenientes reportados por conductores ante fallas del activo</td>
              <td class="px-4 py-3 font-mono text-xs">id, user_id, vehiculo_id, detalle, estado</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">asignaciones</td>
              <td class="px-4 py-3">Tabla Pivot (Historial)</td>
              <td class="px-4 py-3">Historial de conductores asignados a cada vehículo por la administración</td>
              <td class="px-4 py-3 font-mono text-xs">id, user_id, vehiculo_id, fecha_inicio, fecha_fin, activa</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr>

      <h2>4. Estrategia de Desarrollo — Prototipado y Ciclo RAD</h2>
      <p>Para no perderse en la teoría, se aplica un enfoque de <strong>Desarrollo Rápido de Aplicaciones (RAD)</strong> con tres iteraciones:</p>

      <h3>Iteración 1 — Maquetas de Pantalla (Baja Fidelidad)</h3>
      <p>
        Basado en el análisis de la aplicación, se identificaron las siguientes pantallas clave. Las maquetas a continuación representan el modelo básico de cada vista principal:
      </p>

      <div class="my-8 grid grid-cols-1 gap-8">

        <div class="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/40">
          <div class="px-5 pt-5 pb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-violet-400">Pantalla 1</span>
            <h4 class="text-base font-bold text-white mt-1">Dashboard de Vehículos</h4>
            <p class="text-sm text-slate-400 mt-1">Vista principal de la flota. Lista de vehículos con placa, modelo, estado y alertas de revisión pendiente.</p>
          </div>
          <img src="/mockup_dashboard.png" alt="Mockup Dashboard de Vehículos" class="w-full object-cover" />
        </div>

        <div class="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/40">
          <div class="px-5 pt-5 pb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-violet-400">Pantalla 2</span>
            <h4 class="text-base font-bold text-white mt-1">Ficha Técnica del Vehículo</h4>
            <p class="text-sm text-slate-400 mt-1">Detalle del vehículo con tabs de navegación: Ficha Técnica, Fluidos, Semanal, Observaciones, Asignaciones y más.</p>
          </div>
          <img src="/mockup_ficha_tecnica.png" alt="Mockup Ficha Técnica" class="w-full object-cover" />
        </div>

        <div class="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/40">
          <div class="px-5 pt-5 pb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-violet-400">Pantalla 3</span>
            <h4 class="text-base font-bold text-white mt-1">Revisión de Fluidos</h4>
            <p class="text-sm text-slate-400 mt-1">Formulario diario (Lun–Dom). Cada día permite registrar el nivel de fluido y adjuntar fotografía del estado del vehículo.</p>
          </div>
          <img src="/mockup_fluidos.png" alt="Mockup Revisión de Fluidos" class="w-full object-cover" />
        </div>

        <div class="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/40">
          <div class="px-5 pt-5 pb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-violet-400">Pantalla 4</span>
            <h4 class="text-base font-bold text-white mt-1">Revisión Semanal</h4>
            <p class="text-sm text-slate-400 mt-1">Historial de revisiones semanales previas con opción de registrar nueva revisión con observaciones y video.</p>
          </div>
          <img src="/mockup_semanal.png" alt="Mockup Revisión Semanal" class="w-full object-cover" />
        </div>

        <div class="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/40">
          <div class="px-5 pt-5 pb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-violet-400">Pantalla 5</span>
            <h4 class="text-base font-bold text-white mt-1">Observaciones</h4>
            <p class="text-sm text-slate-400 mt-1">Registro de novedades e inconvenientes del vehículo. Estados: Pendiente / Resuelta. El conductor reporta con hasta 500 caracteres.</p>
          </div>
          <img src="/mockup_observaciones.png" alt="Mockup Observaciones" class="w-full object-cover" />
        </div>

      </div>


      <h3>Iteración 2 — Refinamiento y prototipo funcional</h3>
      <ul>
        <li>Validación de formularios y manejo de errores.</li>
        <li>Pruebas de usabilidad con conductores reales en campo.</li>
      </ul>

      <h3>Iteración 3 — Ingeniería completa y sistema final</h3>
      <ul>
        <li>Reportes exportables en PDF y compresión automática de imágenes.</li>
      </ul>
    `,
    },
    {
        id: 3,
        slug: "analisis-diseno-sistemas-control-vehiculos",
        title: 'Fases del Análisis y Diseño de Sistemas Aplicadas al Proyecto "Control-Vehículos"',
        date: "2026-04-15",
        category: "Análisis y Diseño de Sistemas",
        excerpt:
            "Desde el estudio de viabilidad hasta la selección arquitectónica: cómo las fases clásicas de análisis y diseño de sistemas guiaron la construcción del sistema de gestión de flotas.",
        coverImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        content: `
      <h2>1. Fases del Análisis de Sistemas Aplicadas al Proyecto</h2>

      <h3>1.1. Inicio del Análisis</h3>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-6 mb-3">1.1.1. Contextualización</h4>
      <p>
        El <strong>Análisis de Sistemas</strong> actúa como la brújula fundamental de este proyecto. Antes de estructurar la base de datos o desarrollar la lógica del negocio, esta disciplina nos permitió comprender a fondo el entorno logístico: la administración de la flota, los ciclos de mantenimiento y el control de asignaciones. Construir una solución de software sin entender primero cómo la organización gestiona sus activos vehiculares habría resultado en una aplicación huérfana de contexto, incapaz de resolver los cuellos de botella reales.
      </p>

      <hr>

      <h3>1.2. Fase de Inspección: Estudio de Viabilidad del Proyecto</h3>

      <div class="my-8 space-y-4">
        <div class="rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-5">
          <h4 class="flex items-center gap-2 text-base font-bold text-emerald-400 mb-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600/20 text-sm">✅</span>
            Viabilidad Técnica
          </h4>
          <p class="text-sm text-slate-300 mb-0">
            El proyecto es altamente factible. Se cuenta con el conocimiento técnico necesario (desarrollo backend robusto, estructuración de bases de datos relacionales y despliegue en servidores internos) para construir y mantener el sistema sin depender de infraestructuras de terceros excesivamente costosas.
          </p>
        </div>

        <div class="rounded-xl border border-amber-700/40 bg-amber-950/30 p-5">
          <h4 class="flex items-center gap-2 text-base font-bold text-amber-400 mb-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600/20 text-sm">💰</span>
            Viabilidad Económica
          </h4>
          <p class="text-sm text-slate-300 mb-0">
            El desarrollo se justifica plenamente por el retorno de inversión (ROI) a mediano plazo. La automatización del control vehicular reduce drásticamente los costos por mantenimientos correctivos (al alertar sobre mantenimientos preventivos a tiempo), optimiza el uso de combustible y minimiza las horas-hombre perdidas en auditorías manuales de la flota.
          </p>
        </div>

        <div class="rounded-xl border border-sky-700/40 bg-sky-950/30 p-5">
          <h4 class="flex items-center gap-2 text-base font-bold text-sky-400 mb-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600/20 text-sm">👥</span>
            Viabilidad Operativa
          </h4>
          <p class="text-sm text-slate-300 mb-0">
            La solución fue concebida como una plataforma web centralizada. Esto garantiza una curva de aprendizaje mínima para el personal administrativo y logístico, quienes están familiarizados con navegadores web, asegurando una alta tasa de adopción y resistencia al cambio casi nula.
          </p>
        </div>
      </div>

      <blockquote>
        <strong>Conclusión del Informe de Viabilidad:</strong> El proyecto es técnica, económica y operativamente viable, representando una mejora crítica para la infraestructura tecnológica de la empresa.
      </blockquote>

      <hr>

      <h3>1.3. Fase de Estudio: Análisis del Sistema Actual</h3>
      <p>
        El sistema actual (el <strong>"AS IS"</strong>) opera de manera altamente manual y fragmentada. El control de la flota se lleva a cabo mediante hojas de cálculo aisladas y comunicación no estructurada.
      </p>

      <div class="my-6 rounded-xl border border-red-700/40 bg-red-950/20 p-5">
        <h4 class="text-base font-bold text-red-400 mb-3">⚠️ Deficiencias Principales</h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-slate-300 mb-0">
          <li>Alta <strong>redundancia de datos</strong> entre hojas de cálculo.</li>
          <li><strong>Pérdida de historial</strong> de reparaciones y mantenimientos.</li>
          <li>Nula <strong>trazabilidad</strong> en la asignación de vehículos a conductores en tiempo real.</li>
          <li>Grave <strong>vulnerabilidad</strong> ante la pérdida de archivos locales.</li>
        </ul>
      </div>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-8 mb-3">Instrumento de Recolección Propuesto</h4>
      <p>
        <strong>Entrevista semi-estructurada</strong> dirigida al Coordinador Logístico. Posibles preguntas:
      </p>
      <ol>
        <li>¿Cómo lleva actualmente el registro diario de los vehículos disponibles frente a los que están en taller?</li>
        <li>¿Cuánto tiempo le toma rastrear a qué conductor se le asignó una unidad específica la semana pasada?</li>
        <li>¿Qué procedimiento siguen cuando se extravía el reporte físico de una falla vehicular?</li>
      </ol>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-8 mb-3">Modelado del Sistema Actual</h4>
      <p>
        A continuación, se presenta el <strong>Diagrama de Actividad UML</strong> que refleja el flujo manual y las deficiencias del proceso actual:
      </p>

      <div class="my-10 p-6 bg-slate-900/60 rounded-xl border border-slate-700/50 flex flex-col items-center">
        <h4 class="text-lg font-medium text-slate-300 mb-6 text-center">Diagrama de Actividad: Proceso Manual Actual (AS IS)</h4>
        <div class="mermaid w-full flex justify-center">
            flowchart TD
                classDef start fill:#7c3aed,stroke:#a78bfa,color:#fff,stroke-width:2px
                classDef process fill:#1e293b,stroke:#6366f1,color:#fff,stroke-width:2px
                classDef decision fill:#1e293b,stroke:#f59e0b,color:#fff,stroke-width:2px
                classDef endNode fill:#1e293b,stroke:#64748b,color:#cbd5e1,stroke-width:2px

                A(["Inicio: Solicitud de vehículo"]):::start
                B["Coordinador busca en hoja de cálculo la disponibilidad"]:::process
                C{"¿Hay vehículo disponible?"}:::decision
                D["Asignar vehículo verbalmente al conductor"]:::process
                E["Anotar manualmente en Excel la salida"]:::process
                F["Conductor retorna el vehículo"]:::process
                G{"¿Se reportó alguna falla?"}:::decision
                H["Conductor comunica la falla de forma verbal o en papel"]:::process
                I["Coordinador registra la falla en otra hoja de cálculo"]:::process
                J["Actualizar manualmente el estado en Excel"]:::process
                K(["Fin del proceso"]):::endNode
                L["Esperar hasta que se libere una unidad"]:::process

                A --> B
                B --> C
                C -- Sí --> D
                C -- No --> L
                L --> B
                D --> E
                E --> F
                F --> G
                G -- Sí --> H
                G -- No --> J
                H --> I
                I --> J
                J --> K
        </div>
        <p class="text-xs text-slate-500 mt-6 text-center italic">Figura 1: Diagrama de Actividad UML — Flujo manual del proceso actual (AS IS).</p>
      </div>

      <hr>

      <h3>1.4. Fase de Definición: Requisitos del Sistema (El "TO BE")</h3>
      <p>
        El nuevo sistema centralizado elimina los silos de información.
      </p>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-6 mb-3">Requisitos Funcionales (RF)</h4>
      <div class="my-6 overflow-x-auto rounded-xl border border-slate-700/50">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-800/80 text-violet-400 uppercase text-xs tracking-widest">
            <tr>
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Requisito Funcional</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">RF-01</td>
              <td class="px-4 py-3">El sistema debe permitir el registro, modificación y baja del inventario de vehículos.</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">RF-02</td>
              <td class="px-4 py-3">El sistema debe gestionar la asignación de vehículos a empleados/conductores, registrando fecha de salida y retorno.</td>
            </tr>
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">RF-03</td>
              <td class="px-4 py-3">El sistema debe registrar el historial de mantenimientos (preventivos y correctivos) asociados a cada unidad.</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">RF-04</td>
              <td class="px-4 py-3">El sistema debe generar reportes de disponibilidad de flota en tiempo real.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-8 mb-3">Detalle de Funcionalidad (Historias de Usuario)</h4>

      <div class="my-6 space-y-4">
        <div class="rounded-xl border border-violet-700/40 bg-violet-950/20 p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-block rounded-full bg-violet-600/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-violet-400 border border-violet-600/40">RODOLFO MENDOZA</span>
            <span class="text-sm font-semibold text-white">Asignación</span>
          </div>
          <p class="text-sm text-slate-300 mb-0">
            <em>Como</em> <strong>Coordinador Logístico</strong>, <em>quiero</em> registrar la salida y entrada de cada vehículo en el sistema, <em>para</em> saber en tiempo real qué empleado tiene asignada la unidad.
          </p>
        </div>

        <div class="rounded-xl border border-violet-700/40 bg-violet-950/20 p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-block rounded-full bg-violet-600/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-violet-400 border border-violet-600/40">JUAN CARLOS</span>
            <span class="text-sm font-semibold text-white">Mantenimiento</span>
          </div>
          <p class="text-sm text-slate-300 mb-0">
            <em>Como</em> <strong>Auditor</strong>, <em>quiero</em> visualizar el historial de fallas de un vehículo específico, <em>para</em> autorizar su ingreso a taller de forma justificada.
          </p>
        </div>
      </div>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-8 mb-3">Requisitos No Funcionales (RNF)</h4>
      <div class="my-6 overflow-x-auto rounded-xl border border-slate-700/50">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-800/80 text-violet-400 uppercase text-xs tracking-widest">
            <tr>
              <th class="px-4 py-3">Categoría</th>
              <th class="px-4 py-3">Requisito</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">Rendimiento</td>
              <td class="px-4 py-3">El backend debe procesar las consultas de disponibilidad en menos de <strong>2 segundos</strong>.</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-mono text-violet-300">Seguridad</td>
              <td class="px-4 py-3">Implementar control de acceso basado en roles (<strong>Administrador</strong>, <strong>Despachador</strong>, <strong>Auditor</strong>).</td>
            </tr>
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-mono text-violet-300">Disponibilidad</td>
              <td class="px-4 py-3">Garantizar un uptime acorde al horario laboral operativo (servidor local de la empresa).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote>
        <strong>Priorización:</strong> Para la primera versión (MVP), son esenciales los módulos de <strong>inventario vehicular</strong> y <strong>asignación de responsables</strong>. Los módulos de analítica avanzada y predicción de desgaste de piezas quedan relegados a futuras iteraciones.
      </blockquote>

      <hr>

      <h2>2. Fases del Diseño de Sistemas Aplicadas al Proyecto</h2>

      <h3>2.1. Inicio del Diseño: Contextualización</h3>
      <p>
        Si el análisis nos entregó el <strong>"qué"</strong> (necesitamos controlar vehículos y mantenimientos), la fase de diseño define el <strong>"cómo"</strong>. Aquí es donde los requerimientos funcionales abstractos se transforman en una arquitectura de software tangible. Los procesos de negocio se traducen en esquemas para la base de datos, y las necesidades de los usuarios se convierten en interfaces, endpoints y lógica de backend estructurada.
      </p>

      <hr>

      <h3>2.2. Fase de Selección: Selección del Objetivo de Diseño</h3>
      <p>
        Para el desarrollo de este sistema interno, se evaluaron dos alternativas arquitectónicas principales:
      </p>

      <div class="my-8 overflow-x-auto rounded-xl border border-slate-700/50">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-800/80 text-violet-400 uppercase text-xs tracking-widest">
            <tr>
              <th class="px-4 py-3">Criterio de Evaluación</th>
              <th class="px-4 py-3">Alternativa A (App Escritorio tradicional)</th>
              <th class="px-4 py-3">
                Alternativa B (Web Cliente-Servidor)
                <span class="ml-1 inline-block rounded-full bg-emerald-600/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-600/40">Seleccionada</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-semibold text-white">Distribución / Despliegue</td>
              <td class="px-4 py-3">Difícil (instalación manual equipo por equipo).</td>
              <td class="px-4 py-3 text-emerald-300">Ágil (despliegue centralizado en el servidor local).</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-semibold text-white">Mantenimiento y Updates</td>
              <td class="px-4 py-3">Complejo (requiere actualizar cada terminal).</td>
              <td class="px-4 py-3 text-emerald-300">Eficiente (los cambios se reflejan al recargar el navegador).</td>
            </tr>
            <tr class="bg-slate-900/40">
              <td class="px-4 py-3 font-semibold text-white">Compatibilidad</td>
              <td class="px-4 py-3">Dependiente del Sistema Operativo del cliente.</td>
              <td class="px-4 py-3 text-emerald-300">Multiplataforma (solo requiere un navegador web).</td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="px-4 py-3 font-semibold text-white">Costo Operativo</td>
              <td class="px-4 py-3">Alto a largo plazo por soporte técnico en sitio.</td>
              <td class="px-4 py-3 text-emerald-300">Bajo, centralizado y soportado por tecnologías Open Source.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="font-sans text-lg font-semibold text-slate-200 mt-8 mb-3">Justificación de la Selección (Arquitectura del Sistema)</h4>
      <p>
        Se eligió la <strong>Alternativa B (Arquitectura Cliente-Servidor Web)</strong> por su innegable escalabilidad y facilidad de mantenimiento. Al apostar por un ecosistema web apoyado en una base de datos relacional sólida, garantizamos que el sistema pueda manejar la creciente flota de la empresa sin degradación del rendimiento.
      </p>
      <p>
        Además, el uso de bases de datos relacionales es el estándar óptimo para garantizar la <strong>integridad referencial</strong> (asegurar que el historial de mantenimiento nunca quede huérfano si se da de baja un vehículo). Esta arquitectura minimiza los costos a largo plazo y centraliza la información de manera segura, eficiente y accesible para todos los usuarios autorizados.
      </p>
    `,
    },
];

export default posts;
