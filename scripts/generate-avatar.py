"""Genera el avatar ilustrado (SVG, animado con CSS) de Brandon en el estilo cel del portafolio.

Solo usa la librería estándar de Python. Uso:
    python3 scripts/generate-avatar.py public/images/brandon-avatar.svg

Paleta de piel, pelo y barba tomada de la foto de referencia. Los rizos se generan con
semilla fija, así que el resultado es reproducible; el resto del trazo está en la plantilla SVG.
"""
import math, random, sys

random.seed(5)
OUT = sys.argv[1]

INK = '#0f2236'
SKIN = '#d98a66'
SKIN_SH = '#a96650'
SKIN_HI = '#eea283'
LIPS = '#8a3f31'
HAIR = '#1b1819'
HAIR_HI = '#4a3f3b'
BEARD = '#1f1817'
BROW = '#24160f'
IRIS = '#2b1710'
SHIRT = '#ffc83d'
SHIRT_SH = '#f0a12a'
LEAF = '#23894b'
LEAF2 = '#3fbf6e'
HIBISCUS = '#ff6a4d'
CREAM = '#fffaf0'
SEA = '#14b8b0'


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


# ---------- pelo: volumen arriba, lados cortos hasta las sienes ----------
def bumpy(points, cx=200, cy=150, lo=11, hi=19):
    d = ''
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2
        nx, ny = mx - cx, my - cy
        ln = math.hypot(nx, ny) or 1
        push = random.uniform(lo, hi)
        d += f' Q{f(mx + nx / ln * push)} {f(my + ny / ln * push)} {f(x1)} {f(y1)}'
    return d


def hair_path():
    cx, cy, rx, ry = 200, 132, 104, 84
    top = []
    n = 20
    a0, a1 = math.radians(196), math.radians(-16)
    for i in range(n + 1):
        t = a0 + (a1 - a0) * i / n
        top.append((cx + rx * math.cos(t), cy - ry * math.sin(t) * (1 + 0.04 * random.uniform(-1, 1))))
    right_side = [top[-1], (290, 168), (279, 194)]
    left_side = [(121, 194), (110, 168), top[0]]
    d = f'M{f(top[0][0])} {f(top[0][1])}' + bumpy(top) + bumpy(right_side, lo=7, hi=12)
    # línea del pelo sobre la frente (ondulada), de derecha a izquierda
    hl = [(279, 194), (272, 160), (258, 138), (236, 126), (214, 124), (200, 128), (184, 124), (162, 128), (142, 140), (128, 162), (121, 194)]
    for (x0, y0), (x1, y1) in zip(hl, hl[1:]):
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2 + random.uniform(5, 10)
        d += f' Q{f(mx)} {f(my)} {f(x1)} {f(y1)}'
    d += bumpy(left_side, lo=7, hi=12) + ' Z'
    return d


def hair_curls():
    out = []
    tries = 0
    while len(out) < 26 and tries < 500:
        tries += 1
        x = random.uniform(112, 288)
        y = random.uniform(56, 175)
        # dentro del volumen, por encima de la línea del pelo
        if ((x - 200) / 98) ** 2 + ((y - 132) / 80) ** 2 > 1:
            continue
        if y > 120 and 136 < x < 264:
            continue
        s = random.uniform(5, 8)
        rot = random.uniform(-40, 220)
        out.append(f'<path d="M{f(x - s)} {f(y)} a{f(s)} {f(s)} 0 0 1 {f(2 * s)} 0" transform="rotate({f(rot)} {f(x)} {f(y)})"/>')
    return '\n      '.join(out)


def loose_curls():
    # unos pocos rizos sueltos sobre el contorno superior (se mueven suavemente)
    spots = [(150, 62, -20), (205, 46, 8), (258, 64, 30), (116, 104, -50)]
    out = []
    for i, (x, y, rot) in enumerate(spots):
        out.append(
            f'<g class="av-curl" style="animation-delay:{-i * 0.9:.1f}s"><path d="M{x} {y} c -4 -10 6 -16 12 -10 c 4 4 0 10 -5 8" transform="rotate({rot} {x} {y})"/></g>'
        )
    return '\n    '.join(out)


# ---------- estampado de la camisa ----------
def leaf(x, y, rot, s, color):
    return (
        f'<g transform="translate({x} {y}) rotate({rot}) scale({s})">'
        f'<path d="M0 0 C 14 -10, 34 -10, 48 0 C 34 10, 14 10, 0 0 Z" fill="{color}" stroke="{INK}" stroke-width="2.5"/>'
        f'<path d="M4 0 H44" stroke="{INK}" stroke-width="1.6" opacity="0.6"/>'
        '</g>'
    )


def hibiscus(x, y, s):
    petals = ''.join(
        f'<ellipse cx="0" cy="-9" rx="6" ry="9" transform="rotate({a})" fill="{HIBISCUS}" stroke="{INK}" stroke-width="2"/>'
        for a in range(0, 360, 72)
    )
    return f'<g transform="translate({x} {y}) scale({s})">{petals}<circle r="3.5" fill="{SHIRT}" stroke="{INK}" stroke-width="1.6"/></g>'


pattern = ''.join(
    [
        leaf(40, 372, -30, 1.0, LEAF),
        leaf(60, 360, 20, 0.8, LEAF2),
        hibiscus(92, 352, 1.0),
        leaf(112, 392, -60, 0.9, LEAF2),
        leaf(136, 340, 40, 0.7, LEAF),
        leaf(300, 360, 200, 0.9, LEAF),
        hibiscus(322, 384, 1.1),
        leaf(268, 345, 150, 0.75, LEAF2),
        leaf(350, 350, 230, 0.8, LEAF2),
        hibiscus(258, 392, 0.8),
    ]
)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="Ilustración de Brandon Barreto Lozano">
  <!-- Avatar ilustrado de Brandon Barreto Lozano · estilo cel del portafolio "El mar de los siete colores" -->
  <style>
    .av-body {{ transform-origin: 200px 400px; animation: av-breathe 5s ease-in-out infinite; }}
    .av-head {{ transform-origin: 200px 300px; animation: av-tilt 7s ease-in-out infinite; }}
    .av-hair {{ transform-origin: 200px 200px; animation: av-hair 7s ease-in-out infinite; }}
    .av-eye {{ transform-box: fill-box; transform-origin: center; animation: av-blink 5.5s infinite; }}
    .av-brow {{ animation: av-brow 7s ease-in-out infinite; }}
    .av-curl {{ transform-box: fill-box; transform-origin: 50% 100%; animation: av-curl 3.6s ease-in-out infinite; }}
    .av-glint {{ animation: av-glint 6s ease-in-out infinite; }}
    @keyframes av-breathe {{ 0%,100% {{ transform: scaleY(1); }} 50% {{ transform: scaleY(1.012) translateY(-1px); }} }}
    @keyframes av-tilt {{ 0%,100% {{ transform: rotate(-1.6deg) translateY(0); }} 50% {{ transform: rotate(1.4deg) translateY(-2px); }} }}
    @keyframes av-hair {{ 0%,100% {{ transform: rotate(-0.6deg); }} 55% {{ transform: rotate(0.8deg) translateY(-1px); }} }}
    @keyframes av-blink {{ 0%,92%,100% {{ transform: scaleY(1); }} 95% {{ transform: scaleY(0.08); }} }}
    @keyframes av-brow {{ 0%,40%,100% {{ transform: translateY(0); }} 48%,58% {{ transform: translateY(-3px); }} }}
    @keyframes av-curl {{ 0%,100% {{ transform: rotate(-6deg); }} 50% {{ transform: rotate(6deg); }} }}
    @keyframes av-glint {{ 0%,70%,100% {{ opacity: 0; }} 78% {{ opacity: 1; }} }}
    @media (prefers-reduced-motion: reduce) {{
      .av-body, .av-head, .av-hair, .av-eye, .av-brow, .av-curl, .av-glint {{ animation: none; }}
    }}
  </style>
  <defs>
    <clipPath id="av-shirt-clip">
      <path d="M8 400 C 20 352, 84 322, 150 312 L 200 372 L 250 312 C 316 322, 380 352, 392 400 Z"/>
    </clipPath>
    <clipPath id="av-face-clip">
      <path id="av-face-shape" d="M122 172 C 120 120, 158 102, 200 102 C 242 102, 280 120, 278 172 C 280 226, 268 266, 244 290 C 228 306, 172 306, 156 290 C 132 266, 120 226, 122 172 Z"/>
    </clipPath>
  </defs>

  <g class="av-body">
    <!-- cuello -->
    <path d="M166 246 L166 320 Q200 340 234 320 L234 246 Z" fill="{SKIN_SH}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
    <!-- camisa de playa -->
    <path d="M8 400 C 20 352, 84 322, 150 312 L 200 372 L 250 312 C 316 322, 380 352, 392 400 Z" fill="{SHIRT}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
    <g clip-path="url(#av-shirt-clip)">
      {pattern}
      <path d="M8 400 C 20 360, 70 334, 120 324 L 108 400 Z" fill="{SHIRT_SH}" opacity="0.45"/>
    </g>
    <!-- pecho en la abertura -->
    <path d="M168 312 L200 372 L232 312 Q200 330 168 312 Z" fill="{SKIN}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- cuello de la camisa (solapas) -->
    <path d="M150 312 L170 298 L200 372 L166 346 Z" fill="{SHIRT_SH}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M250 312 L230 298 L200 372 L234 346 Z" fill="{SHIRT_SH}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- gafas de sol colgadas en la camisa -->
    <g transform="translate(200 382) rotate(-6)">
      <path d="M-30 -6 h24 a3 3 0 0 1 3 3 v4 a10 10 0 0 1 -10 10 h-8 a10 10 0 0 1 -10 -10 v-4 a3 3 0 0 1 3 -3 Z" fill="{INK}"/>
      <path d="M6 -6 h24 a3 3 0 0 1 3 3 v4 a10 10 0 0 1 -10 10 h-8 a10 10 0 0 1 -10 -10 v-4 a3 3 0 0 1 3 -3 Z" fill="{INK}"/>
      <path d="M-3 -3 q3 -3 6 0" fill="none" stroke="{INK}" stroke-width="3"/>
      <path d="M-26 -2 l8 8 M10 -2 l8 8" stroke="{SEA}" stroke-width="3" stroke-linecap="round" class="av-glint"/>
    </g>
  </g>

  <g class="av-head">
    <!-- orejas -->
    <ellipse cx="120" cy="212" rx="14" ry="22" fill="{SKIN}" stroke="{INK}" stroke-width="4"/>
    <path d="M118 202 q 6 10 0 20" fill="none" stroke="{SKIN_SH}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="280" cy="212" rx="14" ry="22" fill="{SKIN_SH}" stroke="{INK}" stroke-width="4"/>
    <path d="M282 202 q -6 10 0 20" fill="none" stroke="#8a5040" stroke-width="4" stroke-linecap="round"/>

    <!-- cara -->
    <use href="#av-face-shape" fill="{SKIN}"/>
    <g clip-path="url(#av-face-clip)">
      <!-- sombra cel (luz desde la izquierda) -->
      <path d="M242 102 C 270 150, 276 230, 244 304 L 300 300 L 300 100 Z" fill="{SKIN_SH}"/>
      <!-- sombra bajo el pelo -->
      <path d="M120 120 Q 200 150 280 120 L 280 100 L 120 100 Z" fill="{SKIN_SH}" opacity="0.55"/>
      <!-- brillos -->
      <ellipse cx="166" cy="222" rx="14" ry="9" fill="{SKIN_HI}" opacity="0.8"/>
      <ellipse cx="186" cy="146" rx="22" ry="8" fill="{SKIN_HI}" opacity="0.6"/>
    </g>
    <use href="#av-face-shape" fill="none" stroke="{INK}" stroke-width="4"/>

    <!-- barba completa con candado: mejillas bajas, mandíbula y mentón -->
    <path d="M123 190 C 124 246, 146 296, 200 318 C 254 296, 276 246, 277 190 L 271 192 C 268 228, 256 252, 240 262 C 236 246, 222 236, 200 236 C 178 236, 164 246, 160 262 C 144 252, 132 228, 129 192 Z" fill="{BEARD}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- piel a los lados de la perilla, bajo el labio -->
    <path d="M180 278 Q 185 290 194 293 L 194 281 Q 188 278 180 278 Z" fill="{SKIN_SH}"/>
    <path d="M220 278 Q 215 290 206 293 L 206 281 Q 212 278 220 278 Z" fill="{SKIN_SH}"/>
    <!-- textura de barba -->
    <g stroke="#3b2e2a" stroke-width="2" stroke-linecap="round" opacity="0.9">
      <path d="M150 262 l4 6 M160 280 l3 6 M178 300 l2 6 M222 300 l-2 6 M240 280 l-3 6 M250 262 l-4 6 M144 238 l4 5 M256 238 l-4 5"/>
    </g>
    <!-- bigote -->
    <path d="M166 258 C 172 242, 188 238, 200 242 C 212 238, 228 242, 234 258 C 222 250, 210 250, 200 254 C 190 250, 178 250, 166 258 Z" fill="{BEARD}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>
    <!-- labios -->
    <path d="M180 262 Q 200 268 220 262 Q 212 276 200 277 Q 188 276 180 262 Z" fill="{LIPS}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M190 268 q 10 3 20 0" fill="none" stroke="#b5604d" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M178 261 Q 200 266 222 261" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>

    <!-- nariz -->
    <path d="M204 178 C 206 196, 212 210, 218 220 C 214 230, 204 232, 198 228" fill="none" stroke="{SKIN_SH}" stroke-width="5" stroke-linecap="round"/>
    <path d="M184 222 C 186 230, 196 233, 200 230 C 206 233, 214 230, 216 222" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="192" cy="226" rx="3.5" ry="2.2" fill="{INK}" opacity="0.7"/>
    <ellipse cx="209" cy="226" rx="3.5" ry="2.2" fill="{INK}" opacity="0.7"/>
    <ellipse cx="200" cy="214" rx="5" ry="4" fill="{SKIN_HI}"/>

    <!-- ojos -->
    <g class="av-eye" transform="translate(-4 0)">
      <path d="M152 188 Q 170 174 188 187 Q 170 195 152 188 Z" fill="{CREAM}"/>
      <circle cx="171" cy="186" r="7" fill="{IRIS}"/>
      <circle cx="173.5" cy="183.5" r="2.2" fill="{CREAM}"/>
      <path d="M150 188 Q 170 171 190 186" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>
      <path d="M156 192 Q 170 197 184 191" fill="none" stroke="{SKIN_SH}" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g class="av-eye" transform="translate(4 0)">
      <path d="M212 187 Q 230 174 248 188 Q 230 195 212 187 Z" fill="{CREAM}"/>
      <circle cx="229" cy="186" r="7" fill="{IRIS}"/>
      <circle cx="231.5" cy="183.5" r="2.2" fill="{CREAM}"/>
      <path d="M210 186 Q 230 171 250 188" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>
      <path d="M216 191 Q 230 197 244 192" fill="none" stroke="#8a5040" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <!-- cejas gruesas -->
    <g class="av-brow" fill="{BROW}" stroke="{INK}" stroke-width="2" stroke-linejoin="round">
      <path d="M140 170 C 150 155, 172 151, 190 159 L 188 168 C 172 161, 156 164, 144 177 Z"/>
      <path d="M260 170 C 250 155, 228 151, 210 159 L 212 168 C 228 161, 244 164, 256 177 Z"/>
    </g>

    <!-- pelo rizado -->
    <g class="av-hair">
      <path d="{hair_path()}" fill="{HAIR}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
      <g fill="none" stroke="{HAIR_HI}" stroke-width="3" stroke-linecap="round">
      {hair_curls()}
      </g>
      <g fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round">
      {loose_curls()}
      </g>
    </g>
  </g>
</svg>
'''
open(OUT, 'w').write(svg)
print('ok', OUT, len(svg))
