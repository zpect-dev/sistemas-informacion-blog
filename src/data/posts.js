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
];

export default posts;
