// Fuente única de contenido del portafolio.
// Todo lo que aparece aquí proviene del CV de Brandon Barreto Lozano.
// No agregar métricas, clientes ni tecnologías que no estén respaldadas por el CV.

export type Lang = 'es' | 'en';

export const profile = {
  name: 'Brandon Barreto Lozano',
  shortName: 'Brandon Barreto',
  initials: 'BB',
  email: 'brandonbarretolozano@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bbarreto5',
  github: 'https://github.com/bbarreto5',
  // PLACEHOLDER: cuando esté la foto, guardarla en /public/images/ y poner la ruta, p. ej. '/images/brandon.webp'
  photo: null as string | null,
  origin: { place: 'San Andrés Isla, Colombia', coords: '12.58° N · 81.70° W' },
  base: { place: 'Barranquilla, Colombia', coords: '10.96° N · 74.78° W' },
  experienceSince: 2018,
};

/** Tecnologías agrupadas por "cayo" del archipiélago. `core` = presentes en los roles principales recientes. */
export type Cay = { id: string; tech: { name: string; core?: boolean }[] };

export const archipelago: Cay[] = [
  {
    id: 'mobile',
    tech: [{ name: 'Flutter', core: true }, { name: 'Dart', core: true }, { name: 'Android' }, { name: 'iOS' }],
  },
  {
    id: 'frontend',
    tech: [
      { name: 'React', core: true },
      { name: 'Next.js', core: true },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    id: 'backend',
    tech: [
      { name: 'Node.js', core: true },
      { name: 'NestJS', core: true },
      { name: 'Python', core: true },
      { name: 'GraphQL' },
      { name: 'Express' },
      { name: 'FastAPI' },
      { name: 'Django' },
      { name: 'Laravel' },
      { name: '.NET Core' },
      { name: 'C#' },
    ],
  },
  {
    id: 'cloud',
    tech: [
      { name: 'GCP', core: true },
      { name: 'Pub/Sub', core: true },
      { name: 'Cloud Storage', core: true },
      { name: 'Firebase', core: true },
      { name: 'AWS' },
      { name: 'Azure' },
    ],
  },
  {
    id: 'data',
    tech: [
      { name: 'MongoDB', core: true },
      { name: 'Firestore', core: true },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQL Server' },
    ],
  },
  {
    id: 'gis',
    tech: [{ name: 'ArcGIS', core: true }, { name: 'Mapbox', core: true }, { name: 'KML' }, { name: 'GeoTIFF' }],
  },
  {
    id: 'devops',
    tech: [
      { name: 'Git', core: true },
      { name: 'Apache Airflow', core: true },
      { name: 'Docker' },
      { name: 'GitHub' },
      { name: 'GitLab' },
      { name: 'Bitbucket' },
      { name: 'Jira' },
      { name: 'Scrum' },
    ],
  },
];

type Waypoint = {
  id: string;
  period: string;
  org: string;
  role: string;
  summary: string;
  tech?: string[];
  current?: boolean;
  kind: 'work' | 'study';
  /** Rutas paralelas: Medbyte y Precisagro coincidieron en el tiempo. */
  parallel?: boolean;
};

type Expedition = {
  id: string;
  org: string;
  period: string;
  title: string;
  context: string;
  did: string[];
  tech: string[];
  /** Enlace público si existe. PLACEHOLDER: agregar cuando haya uno disponible. */
  link?: string;
};

const es = {
  meta: {
    title: 'Brandon Barreto Lozano — Ingeniero de Sistemas y Full Stack Developer | San Andrés Isla, Colombia',
    description:
      'Ingeniero de Sistemas de San Andrés Isla, Colombia. Full Stack, mobile (Flutter) y cloud (GCP) con Node.js, NestJS, Next.js y React. Líder de desarrollo.',
    ogAlt: 'Brandon Barreto Lozano, Ingeniero de Sistemas de San Andrés Isla, sobre un mar de siete colores ilustrado.',
  },
  nav: {
    skip: 'Saltar al contenido',
    label: 'Navegación principal',
    items: [
      { href: '#sobre-mi', label: 'Sobre mí', coord: '01' },
      { href: '#bitacora', label: 'Trayectoria', coord: '02' },
      { href: '#expediciones', label: 'Proyectos', coord: '03' },
      { href: '#archipielago', label: 'Stack', coord: '04' },
      { href: '#contacto', label: 'Contacto', coord: '05' },
    ],
    langSwitch: { href: '/en/', label: 'EN', aria: 'Read in English' },
  },
  hero: {
    eyebrow: 'Desde San Andrés Isla · Colombia',
    role: 'Ingeniero de Sistemas · Full Stack Developer · Líder de Desarrollo',
    tagline: 'Construyo software de punta a punta —web, móvil, backend y nube— con el Caribe como punto de partida.',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contactarme',
    photoAlt: 'Foto de Brandon Barreto Lozano',
    photoPending: 'foto pendiente',
    terminal: ['$ whoami', 'brandon — full stack · cloud · mobile', '$ cat origen.txt', 'San Andrés Isla, CO'],
  },
  about: {
    kicker: 'Coordenadas',
    title: 'Isleño de origen, ingeniero de oficio',
    paragraphs: [
      'Soy de San Andrés Isla, donde el horizonte es un mar de siete colores. Hoy vivo en Barranquilla y llevo más de 8 años construyendo software: aplicaciones web, apps móviles para Android e iOS, servicios backend y arquitecturas cloud.',
      'He recorrido el ciclo completo —análisis, diseño, desarrollo, despliegue, mantenimiento y optimización— y hoy lidero equipos de desarrollo, cuidando estándares, arquitectura y la conexión entre la ingeniería y lo que necesita el producto.',
      'Un hilo atraviesa mi carrera: los datos que vienen del cielo. Empecé en plataformas de rastreo satelital y llegué a diseñar flujos para procesar imágenes satelitales y soluciones GIS en la nube.',
    ],
    facts: [
      { label: 'Experiencia', value: '8+ años' },
      { label: 'Formación', value: 'Ingeniero de Sistemas · CUC, 2019' },
      { label: 'Origen', value: 'San Andrés Isla' },
      { label: 'Base actual', value: 'Barranquilla · abierto a reubicarme' },
    ],
  },
  logbook: {
    kicker: 'Bitácora de navegación',
    title: 'La ruta hasta hoy',
    intro: 'Cada puerto sumó algo: del frontend al full stack, de ejecutar a liderar.',
    parallelNote: 'Rutas paralelas',
    waypoints: [
      {
        id: 'emotiva',
        period: '2018 — 2020',
        org: 'Emotiva',
        role: 'Ingeniero de Software',
        summary: 'Desarrollo y mantenimiento de plataformas de rastreo satelital y soluciones full stack.',
        tech: ['React', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'],
        kind: 'work',
      },
      {
        id: 'cuc',
        period: 'Mayo 2019',
        org: 'Universidad de la Costa (CUC)',
        role: 'Ingeniero de Sistemas · Diplomado en Redes Convergentes',
        summary: 'Título profesional y diplomado en la misma universidad.',
        kind: 'study',
      },
      {
        id: 'cuc-tech',
        period: '2020 — 2022',
        org: 'Universidad de la Costa',
        role: 'Auxiliar de Tecnología',
        summary: 'Soporte, desarrollo de módulos, mejora de procesos y control de acceso a endpoints.',
        kind: 'work',
      },
      {
        id: 'syntax',
        period: 'Abr 2021 — Sep 2022',
        org: 'Syntax',
        role: 'Ingeniero de Desarrollo Frontend',
        summary: 'Aplicaciones web para procesos de inversión y gestión de servicios, integradas con servicios backend.',
        tech: ['React', 'TypeScript', '.NET Core', 'C#', 'SQL Server'],
        kind: 'work',
      },
      {
        id: 'medbyte',
        period: 'Sep 2022 — Presente',
        org: 'Medbyte',
        role: 'Jefe / Líder de Desarrollo',
        summary: 'Liderazgo técnico del equipo: prioridades, estándares, arquitectura, revisión de código y apps móviles con backend propio.',
        tech: ['Flutter', 'NestJS', 'MongoDB', 'Firebase', 'GCP'],
        current: true,
        parallel: true,
        kind: 'work',
      },
      {
        id: 'precisagro',
        period: 'Dic 2022 — Ago 2026',
        org: 'Precisagro',
        role: 'Desarrollador Full Stack / Soluciones Cloud',
        summary: 'Soluciones AgTech web, móviles y backend; arquitecturas cloud en GCP, GIS e imágenes satelitales.',
        tech: ['Flutter', 'Next.js', 'NestJS', 'Python', 'GCP', 'Airflow'],
        parallel: true,
        kind: 'work',
      },
    ] satisfies Waypoint[],
  },
  expeditions: {
    kicker: 'Expediciones',
    title: 'Proyectos en los que he trabajado',
    intro: 'Trabajo hecho dentro de los equipos de cada empresa. Sin cifras inventadas: lo que hice y con qué.',
    labels: { context: 'Contexto', did: 'Qué hice', tech: 'Stack', link: 'Ver proyecto' },
    items: [
      {
        id: 'satellite-pipeline',
        org: 'Precisagro',
        period: '2022 — 2026',
        title: 'Procesamiento de imágenes satelitales en la nube',
        context: 'Soluciones AgTech que dependen de imágenes satelitales y de procesos que deben correr de forma confiable y automatizada.',
        did: [
          'Diseñé flujos de procesamiento con almacenamiento cloud, procesamiento asíncrono y Pub/Sub.',
          'Automaticé y orquesté procesos con Apache Airflow.',
          'Diseñé e implementé arquitecturas en GCP para almacenamiento, mensajería y procesamiento de información.',
        ],
        tech: ['GCP', 'Cloud Storage', 'Pub/Sub', 'Python', 'Apache Airflow'],
      },
      {
        id: 'agtech-gis',
        org: 'Precisagro',
        period: '2022 — 2026',
        title: 'Plataforma AgTech con mapas y GIS',
        context: 'Aplicaciones web y móviles para el sector agrícola donde la información se entiende sobre el mapa.',
        did: [
          'Implementé soluciones GIS con ArcGIS y Mapbox: mapas, geolocalización, KML y GeoTIFF.',
          'Desarrollé aplicaciones web y móviles con Next.js y Flutter, y servicios con Node.js y NestJS.',
          'Integré APIs y servicios con GraphQL, MongoDB y Firebase/Firestore.',
        ],
        tech: ['Next.js', 'Flutter', 'NestJS', 'TypeScript', 'GraphQL', 'ArcGIS', 'Mapbox', 'MongoDB'],
      },
      {
        id: 'medbyte',
        org: 'Medbyte',
        period: '2022 — Presente',
        title: 'Apps móviles y backend, liderando el equipo',
        context: 'Producto con apps para Android e iOS y servicios propios, que necesita calidad, estabilidad y escalabilidad.',
        did: [
          'Lidero técnicamente al equipo: prioridades, estándares, buenas prácticas y decisiones de arquitectura.',
          'Diseño y desarrollo apps móviles con Flutter y servicios backend con Node.js, NestJS y TypeScript.',
          'Integro MongoDB, Firebase/Firestore, GCP y servicios de terceros; reviso código y acompaño al equipo.',
        ],
        tech: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'MongoDB', 'Firestore', 'GCP'],
      },
      {
        id: 'syntax',
        org: 'Syntax',
        period: '2021 — 2022',
        title: 'Aplicaciones web de inversión y servicios',
        context: 'Aplicaciones web para procesos de inversión y gestión de servicios.',
        did: [
          'Construí interfaces con React y JavaScript/TypeScript integradas con servicios backend.',
          'Participé en el soporte, la resolución de incidencias y la optimización de las aplicaciones.',
        ],
        tech: ['React', 'TypeScript', '.NET Core', 'C#', 'SQL Server'],
      },
      {
        id: 'emotiva',
        org: 'Emotiva',
        period: '2018 — 2020',
        title: 'Plataformas de rastreo satelital',
        context: 'Plataformas de rastreo satelital que había que construir y mantener en todo el stack.',
        did: ['Desarrollé y mantuve las plataformas y soluciones full stack, del frontend a la base de datos.'],
        tech: ['React', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'],
      },
    ] satisfies Expedition[],
  },
  archipelago: {
    kicker: 'Carta del archipiélago',
    title: 'Mi stack, cayo por cayo',
    intro: 'Cada cayo es un dominio. Las boyas amarillas son lo que más uso en mis roles recientes.',
    filterLabel: 'Mostrar',
    filterAll: 'Todo',
    filterCore: 'Principal',
    legendCore: 'Uso principal',
    legendOther: 'También he trabajado con',
    cays: {
      mobile: 'Cayo Mobile',
      frontend: 'Cayo Frontend',
      backend: 'Isla Backend',
      cloud: 'Cayo Cloud',
      data: 'Arrecife de Datos',
      gis: 'Cayo GIS',
      devops: 'Muelle DevOps',
    } as Record<string, string>,
  },
  instruments: {
    kicker: 'Instrumentos',
    title: 'Lo que sé hacer',
    items: [
      { icon: 'server', title: 'Backend y APIs', text: 'Servicios con Node.js, NestJS, Python y .NET Core; APIs REST y GraphQL.' },
      { icon: 'layout', title: 'Frontend', text: 'Interfaces web con React y Next.js en TypeScript.' },
      { icon: 'phone', title: 'Mobile', text: 'Apps para Android e iOS con Flutter, conectadas a su propio backend.' },
      { icon: 'cloud', title: 'Cloud', text: 'Arquitecturas en GCP con Pub/Sub, Cloud Storage y Firebase; experiencia con AWS y Azure.' },
      { icon: 'db', title: 'Bases de datos', text: 'SQL y NoSQL: PostgreSQL, MySQL, SQL Server, MongoDB y Firestore.' },
      { icon: 'map', title: 'GIS y geoespacial', text: 'Mapas, geolocalización, KML y GeoTIFF con ArcGIS y Mapbox.' },
      { icon: 'flow', title: 'Integraciones y orquestación', text: 'Servicios de terceros, procesamiento asíncrono y flujos con Apache Airflow.' },
      { icon: 'compass', title: 'Arquitectura', text: 'Decisiones de arquitectura pensando en calidad, estabilidad y escalabilidad.' },
      { icon: 'crew', title: 'Liderazgo técnico', text: 'Estándares, revisión de código, Scrum y acompañamiento del equipo.' },
    ],
  },
  course: {
    kicker: 'Rumbo actual',
    title: 'Hacia dónde navego',
    text: 'Hoy lidero el desarrollo en Medbyte. Busco nuevos retos como Full Stack Engineer, AI Engineer, Systems Engineer o Solutions Architect.',
    chips: ['Remoto o presencial', 'Colombia o internacional', 'Disponible para reubicarme'],
  },
  contact: {
    kicker: 'Señales',
    title: '¿Construimos algo juntos?',
    text: 'Escríbeme. Respondo desde Colombia, a cualquier puerto.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    copy: 'Copiar email',
    copied: 'Copiado',
    newTab: '(abre en una pestaña nueva)',
  },
  footer: {
    made: 'Diseñado y construido por Brandon Barreto Lozano.',
    from: 'Hecho con raíces en San Andrés Isla.',
    top: 'Volver arriba',
  },
};

const en: typeof es = {
  meta: {
    title: 'Brandon Barreto Lozano — Software Engineer & Full Stack Developer | San Andrés Island, Colombia',
    description:
      'Software Engineer from San Andrés Island, Colombia. Full stack, mobile (Flutter) and cloud (GCP) with Node.js, NestJS, Next.js and React. Development lead.',
    ogAlt: 'Brandon Barreto Lozano, Software Engineer from San Andrés Island, over an illustrated sea of seven colors.',
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main navigation',
    items: [
      { href: '#sobre-mi', label: 'About', coord: '01' },
      { href: '#bitacora', label: 'Journey', coord: '02' },
      { href: '#expediciones', label: 'Projects', coord: '03' },
      { href: '#archipielago', label: 'Stack', coord: '04' },
      { href: '#contacto', label: 'Contact', coord: '05' },
    ],
    langSwitch: { href: '/', label: 'ES', aria: 'Leer en español' },
  },
  hero: {
    eyebrow: 'From San Andrés Island · Colombia',
    role: 'Systems Engineer · Full Stack Developer · Development Lead',
    tagline: 'I build software end to end — web, mobile, backend and cloud — with the Caribbean as my starting point.',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    photoAlt: 'Photo of Brandon Barreto Lozano',
    photoPending: 'photo pending',
    terminal: ['$ whoami', 'brandon — full stack · cloud · mobile', '$ cat origin.txt', 'San Andrés Island, CO'],
  },
  about: {
    kicker: 'Coordinates',
    title: 'Islander by origin, engineer by trade',
    paragraphs: [
      'I’m from San Andrés Island, where the horizon is a sea of seven colors. Today I live in Barranquilla and have spent more than 8 years building software: web applications, Android and iOS apps, backend services and cloud architectures.',
      'I’ve worked across the whole lifecycle — analysis, design, development, deployment, maintenance and optimization — and today I lead development teams, looking after standards, architecture and the link between engineering and what the product needs.',
      'One thread runs through my career: data that comes from the sky. I started on satellite tracking platforms and went on to design pipelines for processing satellite imagery and GIS solutions in the cloud.',
    ],
    facts: [
      { label: 'Experience', value: '8+ years' },
      { label: 'Education', value: 'Systems Engineer · CUC, 2019' },
      { label: 'Origin', value: 'San Andrés Island' },
      { label: 'Based in', value: 'Barranquilla · open to relocating' },
    ],
  },
  logbook: {
    kicker: 'Logbook',
    title: 'The route so far',
    intro: 'Every port added something: from frontend to full stack, from building to leading.',
    parallelNote: 'Parallel routes',
    waypoints: [
      {
        id: 'emotiva',
        period: '2018 — 2020',
        org: 'Emotiva',
        role: 'Software Engineer',
        summary: 'Built and maintained satellite tracking platforms and full stack solutions.',
        tech: ['React', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'],
        kind: 'work',
      },
      {
        id: 'cuc',
        period: 'May 2019',
        org: 'Universidad de la Costa (CUC)',
        role: 'B.Eng. Systems Engineering · Diploma in Converged Networks',
        summary: 'Professional degree and diploma from the same university.',
        kind: 'study',
      },
      {
        id: 'cuc-tech',
        period: '2020 — 2022',
        org: 'Universidad de la Costa',
        role: 'Technology Assistant',
        summary: 'Support, module development, process improvements and endpoint access control.',
        kind: 'work',
      },
      {
        id: 'syntax',
        period: 'Apr 2021 — Sep 2022',
        org: 'Syntax',
        role: 'Frontend Development Engineer',
        summary: 'Web applications for investment processes and service management, integrated with backend services.',
        tech: ['React', 'TypeScript', '.NET Core', 'C#', 'SQL Server'],
        kind: 'work',
      },
      {
        id: 'medbyte',
        period: 'Sep 2022 — Present',
        org: 'Medbyte',
        role: 'Head / Development Lead',
        summary: 'Technical leadership: priorities, standards, architecture, code review and mobile apps with their own backend.',
        tech: ['Flutter', 'NestJS', 'MongoDB', 'Firebase', 'GCP'],
        current: true,
        parallel: true,
        kind: 'work',
      },
      {
        id: 'precisagro',
        period: 'Dec 2022 — Aug 2026',
        org: 'Precisagro',
        role: 'Full Stack Developer / Cloud Solutions',
        summary: 'AgTech web, mobile and backend solutions; GCP cloud architectures, GIS and satellite imagery.',
        tech: ['Flutter', 'Next.js', 'NestJS', 'Python', 'GCP', 'Airflow'],
        parallel: true,
        kind: 'work',
      },
    ],
  },
  expeditions: {
    kicker: 'Expeditions',
    title: 'Projects I’ve worked on',
    intro: 'Work done within each company’s team. No made-up numbers: what I did and what I used.',
    labels: { context: 'Context', did: 'What I did', tech: 'Stack', link: 'View project' },
    items: [
      {
        id: 'satellite-pipeline',
        org: 'Precisagro',
        period: '2022 — 2026',
        title: 'Cloud processing of satellite imagery',
        context: 'AgTech solutions that rely on satellite imagery and on processes that must run reliably and automatically.',
        did: [
          'Designed processing pipelines using cloud storage, asynchronous processing and Pub/Sub.',
          'Automated and orchestrated processes with Apache Airflow.',
          'Designed and implemented GCP architectures for storage, messaging and data processing.',
        ],
        tech: ['GCP', 'Cloud Storage', 'Pub/Sub', 'Python', 'Apache Airflow'],
      },
      {
        id: 'agtech-gis',
        org: 'Precisagro',
        period: '2022 — 2026',
        title: 'AgTech platform with maps and GIS',
        context: 'Web and mobile apps for agriculture, where information makes sense on a map.',
        did: [
          'Implemented GIS solutions with ArcGIS and Mapbox: maps, geolocation, KML and GeoTIFF.',
          'Built web and mobile apps with Next.js and Flutter, and services with Node.js and NestJS.',
          'Integrated APIs and services with GraphQL, MongoDB and Firebase/Firestore.',
        ],
        tech: ['Next.js', 'Flutter', 'NestJS', 'TypeScript', 'GraphQL', 'ArcGIS', 'Mapbox', 'MongoDB'],
      },
      {
        id: 'medbyte',
        org: 'Medbyte',
        period: '2022 — Present',
        title: 'Mobile apps and backend, leading the team',
        context: 'A product with Android and iOS apps and in-house services that needs quality, stability and scalability.',
        did: [
          'I lead the team technically: priorities, standards, best practices and architecture decisions.',
          'I design and build Flutter mobile apps and backend services with Node.js, NestJS and TypeScript.',
          'I integrate MongoDB, Firebase/Firestore, GCP and third-party services; I review code and mentor the team.',
        ],
        tech: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'MongoDB', 'Firestore', 'GCP'],
      },
      {
        id: 'syntax',
        org: 'Syntax',
        period: '2021 — 2022',
        title: 'Investment and services web apps',
        context: 'Web applications for investment processes and service management.',
        did: [
          'Built interfaces with React and JavaScript/TypeScript integrated with backend services.',
          'Took part in support, incident resolution and application optimization.',
        ],
        tech: ['React', 'TypeScript', '.NET Core', 'C#', 'SQL Server'],
      },
      {
        id: 'emotiva',
        org: 'Emotiva',
        period: '2018 — 2020',
        title: 'Satellite tracking platforms',
        context: 'Satellite tracking platforms that had to be built and maintained across the whole stack.',
        did: ['Built and maintained the platforms and full stack solutions, from frontend to database.'],
        tech: ['React', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'],
      },
    ],
  },
  archipelago: {
    kicker: 'Archipelago chart',
    title: 'My stack, cay by cay',
    intro: 'Each cay is a domain. Yellow buoys are what I use most in my recent roles.',
    filterLabel: 'Show',
    filterAll: 'All',
    filterCore: 'Core',
    legendCore: 'Core',
    legendOther: 'Also worked with',
    cays: {
      mobile: 'Mobile Cay',
      frontend: 'Frontend Cay',
      backend: 'Backend Island',
      cloud: 'Cloud Cay',
      data: 'Data Reef',
      gis: 'GIS Cay',
      devops: 'DevOps Pier',
    },
  },
  instruments: {
    kicker: 'Instruments',
    title: 'What I do',
    items: [
      { icon: 'server', title: 'Backend & APIs', text: 'Services with Node.js, NestJS, Python and .NET Core; REST and GraphQL APIs.' },
      { icon: 'layout', title: 'Frontend', text: 'Web interfaces with React and Next.js in TypeScript.' },
      { icon: 'phone', title: 'Mobile', text: 'Android and iOS apps with Flutter, connected to their own backend.' },
      { icon: 'cloud', title: 'Cloud', text: 'GCP architectures with Pub/Sub, Cloud Storage and Firebase; experience with AWS and Azure.' },
      { icon: 'db', title: 'Databases', text: 'SQL and NoSQL: PostgreSQL, MySQL, SQL Server, MongoDB and Firestore.' },
      { icon: 'map', title: 'GIS & geospatial', text: 'Maps, geolocation, KML and GeoTIFF with ArcGIS and Mapbox.' },
      { icon: 'flow', title: 'Integrations & orchestration', text: 'Third-party services, asynchronous processing and Apache Airflow pipelines.' },
      { icon: 'compass', title: 'Architecture', text: 'Architecture decisions focused on quality, stability and scalability.' },
      { icon: 'crew', title: 'Technical leadership', text: 'Standards, code review, Scrum and mentoring the team.' },
    ],
  },
  course: {
    kicker: 'Current heading',
    title: 'Where I’m sailing next',
    text: 'Today I lead development at Medbyte. I’m looking for new challenges as a Full Stack Engineer, AI Engineer, Systems Engineer or Solutions Architect.',
    chips: ['Remote or on-site', 'Colombia or abroad', 'Open to relocating'],
  },
  contact: {
    kicker: 'Signals',
    title: 'Shall we build something?',
    text: 'Drop me a line. I answer from Colombia, to any port.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    copy: 'Copy email',
    copied: 'Copied',
    newTab: '(opens in a new tab)',
  },
  footer: {
    made: 'Designed and built by Brandon Barreto Lozano.',
    from: 'Made with roots in San Andrés Island.',
    top: 'Back to top',
  },
};

export const content = { es, en };
export type Content = typeof es;
