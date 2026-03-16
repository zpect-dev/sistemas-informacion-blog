// ─────────────────────────────────────────────────────────────────────────────
//  posts.js  —  todas las entradas del blog en texto plano
// ─────────────────────────────────────────────────────────────────────────────

const posts = [
  {
    id: 1,
    slug: 'modelando-requerimientos-control-vehiculos',
    title: 'Modelando los Requerimientos del Proyecto "Control-Vehículos"',
    date: '2026-03-15',
    category: 'Técnica de levantamiento de información',
    excerpt:
      'Análisis profundo sobre la elaboración de prototipos y el modelado de casos de uso aplicado al sistema de gestión de flotas.',
    coverImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
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
    slug: 'fases-modelizacion-control-vehiculos',
    title: 'Fases de Definición, Modelización y Control del Proyecto "Control-Vehículos"',
    date: '2026-03-15',
    category: 'Investigación, Modelado y Documentación',
    excerpt:
      'Investigación de hechos, DER dinámico, DFD, diagrama de red y estrategia de desarrollo RAD para el sistema de flota.',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
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
];

export default posts;
