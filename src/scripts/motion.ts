// Movimiento progresivo: aparición de secciones, progreso de navegación y parallax del hero.
// Todo el contenido es visible sin JS; aquí solo se añade la capa de movimiento.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Las animaciones SMIL (cinta de código del hero) no respetan la media query de CSS.
if (reducedMotion) {
  document.querySelectorAll<SVGSVGElement>('svg').forEach((svg) => svg.pauseAnimations?.());
}

// --- Aparición al hacer scroll -------------------------------------------
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !reducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

// --- Progreso de scroll (velero de la navegación) y parallax -------------
const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('[data-hero]');
let ticking = false;

function update() {
  const max = root.scrollHeight - window.innerHeight;
  root.style.setProperty('--scroll-progress', String(max > 0 ? window.scrollY / max : 0));
  if (hero && !reducedMotion) {
    const p = Math.min(window.scrollY / hero.offsetHeight, 1);
    hero.style.setProperty('--hero-p', p.toFixed(3));
  }
  root.classList.toggle('is-scrolled', window.scrollY > 24);
  ticking = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  },
  { passive: true },
);
update();

// --- Sección activa en la navegación -------------------------------------
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
const sections = [...navLinks]
  .map((a) => document.querySelector<HTMLElement>(a.hash))
  .filter((s): s is HTMLElement => Boolean(s));

if ('IntersectionObserver' in window && sections.length) {
  const navIo = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach((a) => {
          if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => navIo.observe(s));
}
