"""Estiliza la foto de perfil al estilo del portafolio (cel-shading + contorno de tinta + sombra marina).

Uso (requiere Pillow, numpy y scipy, fuera de las dependencias del sitio):
    python3 -m venv .venv && .venv/bin/pip install pillow numpy scipy
    .venv/bin/python scripts/stylize-photo.py foto.png public/images/brandon.webp 14 0.35

Argumentos: entrada, salida, nº de tonos (K) y mezcla cel/foto (0 = foto, 1 = cel puro).
Pensado para retratos sobre fondo gris liso; el recorte se hace por color desde los bordes.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

SRC = sys.argv[1]
OUT = sys.argv[2]
K = int(sys.argv[3]) if len(sys.argv) > 3 else 12
MIX = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0  # 1 = solo cel, 0 = solo foto

img = Image.open(SRC).convert('RGB')
W, H = img.size
a = np.asarray(img).astype(np.float32) / 255.0

# ---------- 1. Recorte del fondo gris (relleno desde los bordes superiores/laterales) ----------
mx = a.max(axis=2)
mn = a.min(axis=2)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
cand = (sat < 0.10) & (mx > 0.40) & (mx < 0.74)
lab, n = ndi.label(cand)
lim = int(H * 0.80)
seeds = set(np.unique(lab[0, :])) | set(np.unique(lab[:lim, 0])) | set(np.unique(lab[:lim, -1]))
seeds.discard(0)
bg = np.isin(lab, list(seeds))
# entre los rizos el fondo se mezcla con el pelo: crecer el fondo con un criterio más laxo en la mitad superior
relaxed = (sat < 0.16) & (mx > 0.34) & (mx < 0.76)
top = np.zeros_like(relaxed)
top[: int(H * 0.55)] = True
bg = ndi.binary_propagation(bg, mask=bg | (relaxed & top))
fg = ~bg
# rellenar huecos de la figura, salvo los que son claramente fondo gris
holes = ndi.binary_fill_holes(fg) & ~fg
fg = fg | (holes & ~relaxed)
fg = ndi.binary_opening(fg, iterations=1)
lab2, n2 = ndi.label(fg)
if n2 > 1:
    sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
    fg = lab2 == (np.argmax(sizes) + 1)
# halo: píxeles grisáceos pegados al borde (fondo mezclado con los rizos) se eliminan
for _ in range(3):
    band = fg & ~ndi.binary_erosion(fg, iterations=6)
    halo = band & (sat < 0.20) & (mx > 0.30) & (mx < 0.80) & top
    fg = fg & ~halo
fg = ndi.binary_opening(fg, iterations=1)
lab3, n3 = ndi.label(fg)
if n3 > 1:
    sizes = ndi.sum(fg, lab3, range(1, n3 + 1))
    fg = lab3 == (np.argmax(sizes) + 1)
soft = ndi.gaussian_filter(fg.astype(np.float32), 2.0)
fg = soft > 0.5
# huecos grises encerrados entre los rizos (solo zona del pelo, por encima de los ojos)
hair_zone = np.zeros_like(fg)
hair_zone[: int(H * 0.33)] = True
gaps = hair_zone & (sat < 0.20) & (mx > 0.35) & (mx < 0.85)
gaps = ndi.binary_dilation(gaps, iterations=1) & hair_zone
fg = fg & ~gaps

# ---------- 2. Suavizado tipo "pintura" ----------
sm = img.filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.MedianFilter(5))
s = np.asarray(sm).astype(np.float32) / 255.0

# ---------- 3. Cuantización de color (k-means) → zonas planas cel-shaded ----------
px = s[fg]
rng = np.random.default_rng(7)
sample = px[rng.choice(len(px), size=min(60000, len(px)), replace=False)]
cent = sample[rng.choice(len(sample), K, replace=False)]
for _ in range(25):
    d = ((sample[:, None, :] - cent[None, :, :]) ** 2).sum(-1)
    idx = d.argmin(1)
    for k in range(K):
        m = idx == k
        if m.any():
            cent[k] = sample[m].mean(0)

labels = np.zeros((H, W), dtype=np.int32)
flat = s.reshape(-1, 3)
best = np.full(flat.shape[0], np.inf)
lab_flat = labels.reshape(-1)
for k in range(K):
    d = ((flat - cent[k]) ** 2).sum(-1)
    m = d < best
    best[m] = d[m]
    lab_flat[m] = k
labels = lab_flat.reshape(H, W)
# limpiar motas pequeñas: filtro de moda aproximado con mediana sobre etiquetas ordenadas por luminancia
lum = cent @ np.array([0.299, 0.587, 0.114])
order = np.argsort(lum)
rank = np.empty(K, dtype=np.int32)
rank[order] = np.arange(K)
ranked = rank[labels]
ranked = ndi.median_filter(ranked, size=9)
labels = order[ranked]

# paleta: leve aumento de saturación; el tono más oscuro se lleva a la tinta del sitio
pal = cent.copy()
grey = pal.mean(1, keepdims=True)
pal = np.clip(grey + (pal - grey) * 1.0, 0, 1)
ink = np.array([0x0F, 0x22, 0x36]) / 255.0
darkest = order[0]
pal[darkest] = ink
out = pal[labels]
photo = np.asarray(img.filter(ImageFilter.MedianFilter(3))).astype(np.float32) / 255.0
# leve realce: contraste y calidez caribeña
photo = np.clip((photo - 0.5) * 1.06 + 0.5, 0, 1)
photo = np.clip(photo * np.array([1.03, 1.0, 0.97]), 0, 1)
out = out * MIX + photo * (1 - MIX)

# ---------- 4. Líneas de tinta ----------
# internas: bordes entre zonas con gran salto de luminancia
L = (pal @ np.array([0.299, 0.587, 0.114]))[labels]
gx = ndi.sobel(L, axis=1)
gy = ndi.sobel(L, axis=0)
edge = (np.hypot(gx, gy) > 0.55) & (MIX > 0.5)
edge = ndi.binary_dilation(edge, iterations=1) & fg
out[edge] = out[edge] * 0.25 + ink * 0.75
# silueta: trazo grueso
solid = ndi.binary_fill_holes(fg)
outline = fg & ~ndi.binary_erosion(solid, iterations=7)
out[outline] = ink

shadow = ndi.shift(solid.astype(np.float32), (0, 16), order=0) > 0.5
shadow &= ~solid
deep = np.array([0x0B, 0x3A, 0x5B]) / 255.0
out[shadow] = deep
alpha = (fg | shadow).astype(np.float32)
rgba = np.dstack([out, alpha])
res = Image.fromarray((rgba * 255).astype(np.uint8))

# ---------- 5. Encuadre para el ojo de buey ----------
cx, cy, size = 640, 590, 1080
box = (max(0, cx - size // 2), max(0, cy - size // 2), min(W, cx + size // 2), min(H, cy + size // 2))
res = res.crop(box).resize((720, 720), Image.LANCZOS)
res.save(OUT, quality=88, method=6) if OUT.endswith('.webp') else res.save(OUT)
print('saved', OUT, res.size, 'bg ratio', round(1 - fg.mean(), 3))
