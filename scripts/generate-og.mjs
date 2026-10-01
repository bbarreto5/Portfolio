// Genera public/og-es.png y public/og-en.png (1200×630) a partir de scripts/og-template.html
// usando Chrome/Chromium en modo headless. Uso: npm run og
// Ruta del navegador configurable con CHROME_PATH.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const template = readFileSync(join(here, 'og-template.html'), 'utf8');

const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('No se encontró Chrome. Define CHROME_PATH.');

// PLACEHOLDER: reemplazar por el dominio definitivo (mismo valor que SITE_URL en astro.config.mjs).
const url = 'example.com';

const variants = {
  es: { eyebrow: 'Desde San Andrés Isla · Colombia', role: 'Ingeniero de Sistemas · Full Stack · Cloud · Mobile' },
  en: { eyebrow: 'From San Andrés Island · Colombia', role: 'Software Engineer · Full Stack · Cloud · Mobile' },
};

for (const [lang, v] of Object.entries(variants)) {
  const html = template.replace('{{eyebrow}}', v.eyebrow).replace('{{role}}', v.role).replace('{{url}}', url);
  const tmp = join(here, `.og-${lang}.html`);
  writeFileSync(tmp, html);
  const out = join(root, 'public', `og-${lang}.png`);
  execFileSync(chrome, [
    '--headless=new',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=2000',
    `--screenshot=${out}`,
    `file://${tmp}`,
  ], { stdio: 'ignore' });
  rmSync(tmp);
  console.log(`✓ ${out}`);
}
