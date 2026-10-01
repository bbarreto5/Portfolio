# Portafolio — Brandon Barreto Lozano

Portafolio personal con la identidad **"El mar de los siete colores"**: ilustración 2D cel-shaded inspirada en San Andrés Isla, con la tecnología integrada al paisaje.

## Stack

- [Astro](https://astro.build) — HTML estático, sin framework de UI en el cliente (JS mínimo: apariciones, progreso de scroll, filtro del stack y copiar email).
- Ilustraciones en SVG inline hechas a mano (sin imágenes pesadas).
- Fuentes autoalojadas: Bricolage Grotesque y JetBrains Mono (Fontsource).
- `@astrojs/sitemap` para el sitemap con hreflang ES/EN.

Requiere Node 22+ (ver `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
npm run og        # regenera public/og-es.png y public/og-en.png (1200×630) con Chrome headless
```

## Estructura

```
src/
  data/profile.ts        ← todo el contenido (ES/EN), proveniente del CV
  layouts/Base.astro     ← SEO, Open Graph, Twitter Card, JSON-LD, hreflang
  components/            ← secciones (Hero, About, Logbook, Expeditions, Archipelago, Instruments, Course, Contact)
  components/scene/      ← piezas ilustradas reutilizables (mar, cayo, palmera, satélite, ojo de buey…)
  scripts/motion.ts      ← animaciones progresivas (respeta prefers-reduced-motion)
  styles/global.css      ← tokens de color, tipografía y utilidades
scripts/                 ← generación de la imagen Open Graph
```

## Foto de perfil

`public/images/brandon-avatar.svg` es una ilustración 2D cel-shaded (camisa de playa, animada con CSS: respira, parpadea, mueve la cabeza y los rizos; respeta `prefers-reduced-motion`). Se genera con `python3 scripts/generate-avatar.py public/images/brandon-avatar.svg` (solo librería estándar). La ruta se configura en `profile.photo` (`src/data/profile.ts`); con `null` el ojo de buey vuelve a mostrar las iniciales.

## Pendientes (placeholders)

| Qué | Dónde |
| --- | --- |
| Dominio definitivo | `SITE_URL` en `astro.config.mjs`, `url` en `scripts/generate-og.mjs`, `public/robots.txt` → luego `npm run og` |
| Enlaces de proyectos | Campo opcional `link` en cada expedición de `src/data/profile.ts` |
