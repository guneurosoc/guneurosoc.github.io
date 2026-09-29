# Motion layer (fx)

The site's motion effects: what each one is, where it lives, its tuning constants, and how it behaves under
reduced motion and when it can't be seen. The colour roles come from DESIGN.md §5.

Shared rules:

- **Static first.** Without JS, or with `prefers-reduced-motion: reduce`, every page is complete and static.
  Motion is only added under `(prefers-reduced-motion: no-preference)`. If the OS setting changes while the
  page is open, effects are removed (gsap.matchMedia, the brain and the Lotties all listen for the change).
- **Paused when not seen.** Loops stop offscreen (IntersectionObserver) and when the tab is hidden
  (`visibilitychange`, and requestAnimationFrame stops in hidden tabs anyway).
- **CSP.** Every script is a bundled Astro `<script>` or a dynamic `import()` chunk. There is no inline code,
  eval or wasm, and the CSP in `src/components/Head.astro` is unchanged. `lottie_light` is used because the
  full lottie-web build contains `eval` for expressions.
- **Cleanup.** Everything is torn down on `astro:before-swap`. The brain is also torn down on `pagehide`.

## 1. 3D brain hero

Files: `BrainHero.astro` (poster + loader, eager), `brain-scene.ts` (lazy chunk). Mounted inside
`[data-brain-hero]` in `src/components/HomeHero.astro`, which stays `aria-hidden="true"`.

- The default is the static poster `public/hero-poster.svg` (`<img alt="" loading="eager" fetchpriority="high">`).
- `brain-scene.ts`, three.js and the model (`/assets/models/brain.glb`, "Brain" by dgallichan, CC BY 4.0) load
  only when all of these hold: the hero is within `NEAR_MARGIN` of the viewport,
  `prefers-reduced-motion: no-preference` matches, `navigator.connection?.saveData` is not `true`, and a WebGL2
  context can be created. Otherwise the poster stays.
- Model: vertex colours are deleted and the material becomes a black, slightly glossy `MeshStandardMaterial`,
  lit by a white key light and a deep-violet rim light.
- Network: `CANDIDATES` points are sampled on the surface (`MeshSurfaceSampler`, seeded). Only points on the
  outer shell are kept, because most of the cortex's area is inside sulci and those nodes would never show.
  `NODE_COUNT` of them are picked at an even stride. Each node links to up to `LINK_MAX_PER_NODE` neighbours
  within `LINK_MAX_DIST`.
- Nodes are additive round points in hot pink, electric blue, sky and deep violet. Links are thin additive
  lines at `LINK_OPACITY`.
- Firing: one event every `FIRE_GAP_MIN`–`FIRE_GAP_MAX` s, so at most 2.5 per second, under the 3 flashes/s
  limit (WCAG 2.3.1). If the pointer is over the brain, a raycast fires every node within `POINTER_RADIUS` of
  the hit point. Otherwise a random node fires together with its linked neighbours. A firing node grows,
  brightens and shifts to hot pink, then fades over `FIRE_DECAY`.
- Motion: idle spin at `IDLE_SPEED`. Dragging spins it (`DRAG_SPEED`; vertical tilt clamped to `TILT_LIMIT`),
  and a flick keeps it spinning while the speed decays by `INERTIA_DAMPING`. The canvas uses
  `touch-action: pan-y`, so vertical swipes still scroll the page on phones.
- No bloom pass (removed 2026-09-29: it softened edges and showed a faint rectangle on the light theme).
  The node shader draws each node's glow. DPR is capped at `MAX_DPR`.
- The loop runs through `renderer.setAnimationLoop` and is set to `null` when the hero is offscreen or the tab
  is hidden. A `ResizeObserver` handles resizes. Dispose frees geometries, materials, and the
  renderer, and removes the canvas.
- A lost WebGL context disposes the scene, which brings the poster back. The canvas fades in over 250 ms once
  its first frame is drawn, and the poster fades out.

| Constant | Value | File |
|---|---|---|
| `NEAR_MARGIN` | `'200px'` | BrainHero.astro |
| Save-Data check | `navigator.connection?.saveData === true` keeps the poster and never loads the scene (Chromium exposes it; other browsers load as normal) | BrainHero.astro |
| `NODE_COUNT` | 200 | brain-scene.ts |
| `NODE_SEED` | 20260929 (the poster uses the same seed) | brain-scene.ts |
| `NODE_SIZE` | 9 (CSS px at camera distance 3, × DPR) | brain-scene.ts |
| `NODE_LIFT` | 0.012 model units (brain ≈ 2 units long) | brain-scene.ts |
| `CANDIDATES` / `SHELL_CONE` / `SHELL_DEPTH` | 3000 / 0.985 (≈ 10°) / 0.04 | brain-scene.ts |
| `LINK_MAX_DIST` / `LINK_MAX_PER_NODE` / `LINK_OPACITY` | 0.28 / 3 / 0.35 | brain-scene.ts |
| `NODE_COLOURS` | `#FE67C6 #4F6FFE #8AD2FE #5D16E9` (tokens.css) | brain-scene.ts |
| `FIRE_COLOUR` | `#FE67C6` hot pink | brain-scene.ts |
| `SURFACE_COLOUR` / `SURFACE_EMISSIVE` / `SURFACE_ROUGHNESS` | `#543FCA` indigo / `#241D52` navy / 0.5 | brain-scene.ts |
| `FIRE_GAP_MIN` / `FIRE_GAP_MAX` / `FIRE_DECAY` | 0.4 s / 1.1 s / 0.35 s | brain-scene.ts |
| `POINTER_RADIUS` | 0.3 model units | brain-scene.ts |
| `IDLE_SPEED` | 0.15 rad/s | brain-scene.ts |
| `DRAG_SPEED` / `TILT_LIMIT` / `INERTIA_DAMPING` | 0.008 rad/px / 0.5 rad / 3 per s | brain-scene.ts |
| `START_ROTATION` | x 0.12, y π/2 − 0.35 (three-quarter view of the left hemisphere) | brain-scene.ts |
| `FOV` / `FIT` | 30° / 2.4 units in the shorter canvas side | brain-scene.ts |
| `MAX_DPR` | 2 | brain-scene.ts |

### Poster (`public/hero-poster.svg`, 1200×900, 14,703 bytes)

Playwright's Chromium could not be installed here: `cdn.playwright.dev` returned 403, "Connection blocked by
network allowlist". So the poster was generated procedurally rather than screenshotted. A one-off Node script
(not committed) did the following:

1. Parsed `brain.glb`.
2. Applied the same normalisation, seeded sampling, shell filter, links, start rotation and camera as
   `brain-scene.ts`.
3. Rasterised the projected triangles into a depth buffer.
4. Traced the silhouette with marching squares and simplified it with Ramer–Douglas–Peucker (black fill,
   deep-violet edge).
5. Kept only the nodes and links that pass the depth test.

Nodes are circles with a blur glow, and links use 45% opacity strokes. The background is transparent, so the
lavender CSS glow of the hero panel shows through. To regenerate the poster after changing any network
constant, the same steps need re-running.

## 2. SplitText hero line

File: `fx.ts`. Target: `[data-fx-split]` (the "GU NeuroSoc" line in HomeHero.astro).

- The line is split into words and chars (`<span>`s). Chars rise from `yPercent: SPLIT_OFFSET` with
  `autoAlpha` 0 → 1, so only position and opacity change.
- The split copy is `aria-hidden`. An `sr-only` copy of the text is inserted next to it, so the `<h1>` still
  reads correctly. Both are removed or reverted when the handler reverts.
- Reduced motion: no split, the line is set as normal.

| Constant | Value |
|---|---|
| `SPLIT_DURATION` | 0.5 s (ease `power3.out`) |
| `SPLIT_STAGGER` | 0.035 s |
| `SPLIT_OFFSET` | 40 (yPercent) |

## 3. Action-potential divider (DrawSVG)

Files: `ActionPotential.astro` (markup), `fx.ts` (animation). Used on Home, between "Our aims" and "Latest from
Instagram", and on About, between "Our aims" and "What we do".

- An inline SVG (`aria-hidden`) with viewBox 1200×120. The trace is a resting line, a threshold rise, a sharp
  spike, an undershoot and a recovery.
- Hot-pink stroke. A hard-stop gradient turns the spike tip (above y = 36) poster yellow. The stroke is 3 px,
  with `vector-effect="non-scaling-stroke"` and uniform scaling, which DrawSVG needs to measure the length.
- It is drawn from 0 to 100% once, when its top reaches `AP_START` (ScrollTrigger `once: true`).
- Reduced motion or no JS: fully drawn.

| Constant | Value |
|---|---|
| `AP_DURATION` | 1.4 s (ease `power2.inOut`) |
| `AP_START` | `'top 85%'` |

## 4. Lenis smooth scroll

File: `fx.ts`.

- `new Lenis({ lerp: LENIS_LERP })`, driven by `gsap.ticker`, with `lagSmoothing(0)`.
  `lenis.on('scroll', ScrollTrigger.update)` keeps ScrollTrigger in sync. `lenis/dist/lenis.css` is bundled.
- Reduced motion: no Lenis, so scrolling is native.
- It is destroyed, and ticker lag smoothing restored, when the handler reverts.
- Touch scrolling stays native (Lenis's default `syncTouch: false`).

| Constant | Value |
|---|---|
| `LENIS_LERP` | 0.12 |

## 5. Magnetic buttons

File: `fx.ts`. Targets: `.btn-primary`, `.btn-primary-on-band`, `.btn-secondary`.

- The button follows the pointer by up to `MAGNET_MAX` px on each axis (`gsap.quickTo` on x/y) and springs
  back on `pointerleave`.
- Runs only under `(prefers-reduced-motion: no-preference) and (pointer: fine)`. Listeners are removed on revert.

| Constant | Value |
|---|---|
| `MAGNET_MAX` | 6 px |
| `MAGNET_DURATION` | 0.25 s (ease `power3.out`) |

## 6. Poster-tilt on chips

File: `fx.ts`. Target: `.chip`.

- On hover, a chip rotates by `TILT_MAX`, alternating direction per chip. It returns to 0 on leave. Chip
  tokens are unchanged.
- Runs only under `(prefers-reduced-motion: no-preference) and (hover: hover)`. The hover tweens are recorded
  with `context.add()`, so revert resets them.

| Constant | Value |
|---|---|
| `TILT_MAX` | 3° |
| `TILT_DURATION` | 0.2 s (ease `power2.out`) |

## 7. Synapse-glow on cards

File: `src/styles/global.css`, "fx" section at the bottom. CSS only.

- On `.card:hover` and `.card:focus-within`, the border moves to `--glow` and a lavender glow is added:
  `0 0 1.25rem 0.125rem`, `--glow` at 55%.
- The transition is 200 ms `ease-out`.
- The focus ring stays on the focused element inside the card. If a card is itself focused, it keeps the
  focus halo alongside the glow.
- Reduced motion: no transition. The end state still applies, so focus stays visible.

## 8. Lottie decorations

File: `Lottie.astro`. Props: `src`, `class` (box size via a Tailwind size utility, e.g. `size-14`; default `size-12`, 48px).

- Renders an empty `aria-hidden` box. When it comes within `NEAR_MARGIN`, `lottie-web/build/player/lottie_light`
  is imported and plays `/assets/lottie/<src>` (SVG renderer, looping).
- It plays only while the box is on screen and the tab is visible, and pauses otherwise.
- Reduced motion: it still loads, but shows the first frame and never plays.

| Constant | Value |
|---|---|
| `NEAR_MARGIN` | `'100px'` |

Used in two places:

- `noto-sparkles.json` at 56 px, next to the "Become a member" band headline on Home.
- `noto-high-voltage.json` at 40 px, beside "Standard membership" on Join.

`noto-brain.json` was downloaded but is not used and has been removed from `public/` (record kept in brand/ASSETS.md). The 3D brain is already the page's mascot, and a second, cartoon brain would
compete with it. It is also the largest of the three files (115,765 bytes).

## Bundle sizes (measured 2026-09-29, `pnpm build`, `gzip -c | wc -c`)

Eager JS per page: the `<script type="module" src>` chunks plus their static imports. The Astro build emits
no `modulepreload` links.

| Page | Eager chunks | Gzipped total |
|---|---|---|
| Home | Base (fx.ts) 54,132 + Header 507 + BrainHero 713 + Lottie 944 + preload-helper 770 | 57,066 B |
| Join | Base 54,132 + Header 507 + Lottie 944 + preload-helper 770 | 56,353 B |
| Contact | Base 54,132 + Header 507 + contact 398 | 55,037 B |
| About, Committee, Credits, Code of Conduct, Complaints, Constitution, Privacy, 404 | Base 54,132 + Header 507 | 54,639 B |

Lazy JS (loaded only when needed):

| Chunk | Gzipped | When |
|---|---|---|
| `lottie_light` | 47,021 B | a Lottie box nears the viewport (Home, Join). Home total with it: 104,087 B |
| `brain-scene` (three core, GLTFLoader, sampler, scene) | 155,430 B | brain hero, not reduced motion, WebGL2 |

Data loaded lazily:

- `brain.glb`: 1,578,356 B (1,036,670 gzipped).
- `noto-sparkles.json`: 15,584 B (2,643 gzipped).
- `noto-high-voltage.json`: 89,096 B (16,153 gzipped).
