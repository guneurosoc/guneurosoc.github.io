// Lazy chunk for the 3D brain hero (see README.md in this folder). Imported by BrainHero.astro only
// when the hero is near the viewport, motion is allowed and WebGL2 works.
import {
  AdditiveBlending,
  AmbientLight,
  Box3,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

// ---- Tuning constants (documented in README.md) ----
const MODEL_URL = '/assets/models/brain.glb';
const NODE_COUNT = 200;
const NODE_SEED = 20260929; // same seed as the poster, so the static image matches the first frame
const NODE_SIZE = 9; // point size in CSS px at camera distance 3
const NODE_LIFT = 0.012; // push nodes off the surface along the normal (model units, brain ≈ 2 long)
// Most of a real cortex is hidden in sulci, so surface samples are filtered to the outer shell: a candidate
// is dropped if another candidate within SHELL_CONE (cosine, ≈ 10°) of its direction is SHELL_DEPTH further out.
const CANDIDATES = 3000;
const SHELL_CONE = 0.985;
const SHELL_DEPTH = 0.04;
const LINK_MAX_DIST = 0.28;
const LINK_MAX_PER_NODE = 3;
const LINK_OPACITY = 0.35;
// Node and link colours: tokens.css --color-hot-pink, --color-electric-blue, --color-sky, --color-deep-violet.
const NODE_COLOURS = [0xfe67c6, 0x4f6ffe, 0x8ad2fe, 0x5d16e9];
const FIRE_COLOUR = 0xfe67c6; // DESIGN.md §5: firing pulses are hot pink
const SURFACE_COLOUR = 0x543fca; // tokens.css --color-indigo (black read as a dull silhouette)
const SURFACE_EMISSIVE = 0x241d52; // tokens.css --color-navy, lifts the shadowed side
const SURFACE_ROUGHNESS = 0.5;
const FIRE_GAP_MIN = 0.4; // s between firing events: at most 2.5/s, under WCAG 2.3.1's 3 flashes/s
const FIRE_GAP_MAX = 1.1;
const FIRE_DECAY = 0.35; // s for a pulse to fade
const POINTER_RADIUS = 0.3; // nodes within this distance of the pointer's hit point fire together
const IDLE_SPEED = 0.15; // rad/s
const DRAG_SPEED = 0.008; // rad per px dragged
const TILT_LIMIT = 0.5; // rad, vertical drag clamp
const INERTIA_DAMPING = 3; // 1/s exponential decay of flick speed
const START_ROTATION = { x: 0.12, y: Math.PI / 2 - 0.35 }; // three-quarter view of the left hemisphere
const FOV = 30;
const FIT = 2.4; // model units that must fit in the shorter canvas side
const MAX_DPR = 2;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Samples nodes on the meshes (already in `root` space) and links near neighbours. */
function buildNetwork(meshes: Mesh[], rng: () => number) {
  const tris = meshes.map((m) => (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3);
  const total = tris.reduce((a, b) => a + b, 0);
  const cand: Vector3[] = [];
  const p = new Vector3();
  const n = new Vector3();
  meshes.forEach((mesh, k) => {
    // setRandomGenerator exists in three r186 but is missing from @types/three 0.186.0.
    const sampler = new MeshSurfaceSampler(mesh) as MeshSurfaceSampler & { setRandomGenerator(fn: () => number): void };
    sampler.setRandomGenerator(rng);
    sampler.build();
    const count = k === meshes.length - 1 ? CANDIDATES - cand.length : Math.round((CANDIDATES * tris[k]) / total);
    for (let i = 0; i < count; i++) {
      sampler.sample(p, n);
      p.applyMatrix4(mesh.matrixWorld);
      n.transformDirection(mesh.matrixWorld);
      cand.push(p.clone().addScaledVector(n, NODE_LIFT));
    }
  });
  // ponytail: O(n²) shell filter over CANDIDATES (≤ 9M dot products, once at load)
  const dirs = cand.map((c) => c.clone().normalize());
  const radius = cand.map((c) => c.length());
  const shell = cand.filter(
    (_, i) => !dirs.some((d, j) => radius[j] > radius[i] + SHELL_DEPTH && d.dot(dirs[i]) > SHELL_CONE),
  );
  // Candidates are grouped by mesh, so take an even stride rather than the first NODE_COUNT.
  const step = Math.max(1, shell.length / NODE_COUNT);
  const pos = Array.from({ length: Math.min(NODE_COUNT, shell.length) }, (_, i) => shell[Math.floor(i * step)]);

  const colours = pos.map(() => new Color(NODE_COLOURS[Math.floor(rng() * NODE_COLOURS.length)]));
  const neighbours: number[][] = pos.map(() => []);
  const pairs: [number, number][] = [];
  const seen = new Set<number>();
  pos.forEach((a, i) => {
    pos
      .map((b, j) => [j, a.distanceTo(b)] as const)
      .filter(([j, d]) => j !== i && d < LINK_MAX_DIST)
      .sort((x, y) => x[1] - y[1])
      .slice(0, LINK_MAX_PER_NODE)
      .forEach(([j]) => {
        const key = Math.min(i, j) * pos.length + Math.max(i, j);
        if (seen.has(key)) return;
        seen.add(key);
        pairs.push([i, j]);
        neighbours[i].push(j);
        neighbours[j].push(i);
      });
  });
  return { pos, colours, pairs, neighbours };
}

/** Mounts the scene into `el`. Resolves to a dispose function. */
export async function mount(el: HTMLElement): Promise<() => void> {
  const gltf = await new GLTFLoader().loadAsync(MODEL_URL);

  // ---- Model: black glossy surface, vertex colours dropped, centred and scaled to ~2 units long ----
  const model = gltf.scene;
  const surface = new MeshStandardMaterial({ color: SURFACE_COLOUR, emissive: SURFACE_EMISSIVE, roughness: SURFACE_ROUGHNESS, metalness: 0 });
  const meshes: Mesh[] = [];
  model.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    (o.material as Material).dispose();
    o.geometry.deleteAttribute('color');
    o.material = surface;
    meshes.push(o);
  });
  const box = new Box3().setFromObject(model);
  const scale = 2 / Math.max(...box.getSize(new Vector3()).toArray());
  model.scale.setScalar(scale);
  model.position.copy(box.getCenter(new Vector3()).multiplyScalar(-scale));
  model.updateMatrixWorld(true);

  // ---- Network ----
  const net = buildNetwork(meshes, mulberry32(NODE_SEED));
  const nodeGeo = new BufferGeometry().setFromPoints(net.pos);
  nodeGeo.setAttribute('aColor', new BufferAttribute(new Float32Array(net.colours.flatMap((c) => c.toArray())), 3));
  const count = net.pos.length;
  const fire = new Float32Array(count);
  const fireAttr = new BufferAttribute(fire, 1);
  nodeGeo.setAttribute('aFire', fireAttr);
  const nodeMat = new ShaderMaterial({
    uniforms: { uSize: { value: 1 }, uFireColor: { value: new Color(FIRE_COLOUR) } },
    vertexShader: /* glsl */ `
      attribute vec3 aColor;
      attribute float aFire;
      uniform float uSize;
      uniform vec3 uFireColor;
      varying vec3 vColor;
      varying float vFire;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (1.0 + 1.2 * aFire) * (3.0 / -mv.z);
        vColor = mix(aColor, uFireColor, aFire);
        vFire = aFire;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vFire;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d) * 0.7 + smoothstep(0.2, 0.0, d);
        gl_FragColor = vec4(vColor * glow * (0.9 + 1.6 * vFire), min(glow, 1.0)); // alpha follows the glow: no dark specks on light backgrounds
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const nodes = new Points(nodeGeo, nodeMat);

  const linkPos: number[] = [];
  const linkCol: number[] = [];
  for (const [a, b] of net.pairs) {
    linkPos.push(...net.pos[a].toArray(), ...net.pos[b].toArray());
    linkCol.push(...net.colours[a].toArray(), ...net.colours[b].toArray());
  }
  const linkGeo = new BufferGeometry();
  linkGeo.setAttribute('position', new BufferAttribute(new Float32Array(linkPos), 3));
  linkGeo.setAttribute('color', new BufferAttribute(new Float32Array(linkCol), 3));
  const links = new LineSegments(
    linkGeo,
    new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: LINK_OPACITY,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
  );

  const spin = new Group();
  spin.rotation.set(START_ROTATION.x, START_ROTATION.y, 0);
  spin.add(model, links, nodes);

  const scene = new Scene();
  scene.add(spin, new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 3, 4);
  const rim = new DirectionalLight(0x5d16e9, 3); // deep violet rim, tokens.css --color-deep-violet
  rim.position.set(-3, 1, -3);
  scene.add(key, rim);

  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);

  // ---- Renderer (transparent, so the lavender CSS glow behind it shows) ----
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  const dpr = Math.min(window.devicePixelRatio, MAX_DPR);
  renderer.setPixelRatio(dpr);
  const canvas = renderer.domElement;
  canvas.style.touchAction = 'pan-y'; // horizontal drag spins, vertical swipes still scroll the page
  canvas.style.cursor = 'grab';

  // No bloom pass: it bypassed the canvas antialiasing (soft edges) and its output showed as a faint
  // rectangle on the light theme. Nodes carry their own soft glow in the node shader.

  const resize = () => {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    camera.aspect = w / h;
    const halfTan = Math.tan((FOV * Math.PI) / 360);
    camera.position.set(0, 0, FIT / (2 * halfTan * Math.min(1, camera.aspect)));
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    nodeMat.uniforms.uSize.value = NODE_SIZE * dpr;
    render();
  };
  const render = () => renderer.render(scene, camera);

  // ---- Interaction: drag to spin with inertia, pointer makes nearby nodes fire ----
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;
  let flick = 0; // rad/s added to the idle spin, decays with INERTIA_DAMPING
  let pointer: Vector2 | null = null;
  const toNdc = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return new Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = e.timeStamp;
    flick = 0;
    pointer = toNdc(e);
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  };
  const onMove = (e: PointerEvent) => {
    pointer = toNdc(e);
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dt = Math.max(1, e.timeStamp - lastT) / 1000;
    spin.rotation.y += dx * DRAG_SPEED;
    spin.rotation.x = Math.max(-TILT_LIMIT, Math.min(TILT_LIMIT, spin.rotation.x + dy * DRAG_SPEED));
    flick = (dx * DRAG_SPEED) / dt;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = e.timeStamp;
  };
  const onUp = (e: PointerEvent) => {
    if (e.timeStamp - lastT > 100) flick = 0; // held still before letting go: no throw
    dragging = false;
    canvas.style.cursor = 'grab';
  };
  const onLeave = () => {
    if (!dragging) pointer = null;
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('pointerleave', onLeave);

  // ---- Firing: one event every FIRE_GAP_MIN..MAX s; near the pointer if it is over the brain ----
  const rng = Math.random;
  const raycaster = new Raycaster();
  const fireStart = new Float32Array(count).fill(-1e9);
  let nextFire = 0;
  const local = new Vector3();
  const fireEvent = (t: number) => {
    let group: number[] = [];
    if (pointer) {
      // ponytail: brute-force raycast over 75k triangles, at most 2.5×/s; add three-mesh-bvh if it shows in profiles
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];
      if (hit) {
        spin.worldToLocal(local.copy(hit.point));
        group = net.pos.flatMap((p, i) => (p.distanceTo(local) < POINTER_RADIUS ? [i] : []));
      }
    }
    if (!group.length) {
      const i = Math.floor(rng() * count);
      group = [i, ...net.neighbours[i]];
    }
    for (const i of group) fireStart[i] = t;
  };

  // ---- Loop, paused offscreen and when the tab is hidden ----
  let prev = 0;
  let clock = 0;
  const frame = (now: number) => {
    const dt = Math.min(0.05, prev ? (now - prev) / 1000 : 0);
    prev = now;
    clock += dt;
    if (!dragging) {
      flick *= Math.exp(-INERTIA_DAMPING * dt);
      spin.rotation.y += (IDLE_SPEED + flick) * dt;
    }
    if (clock >= nextFire) {
      fireEvent(clock);
      nextFire = clock + FIRE_GAP_MIN + rng() * (FIRE_GAP_MAX - FIRE_GAP_MIN);
    }
    for (let i = 0; i < count; i++) fire[i] = Math.max(0, 1 - (clock - fireStart[i]) / FIRE_DECAY);
    fireAttr.needsUpdate = true;
    render();
  };

  let onScreen = false;
  const update = () => {
    const run = onScreen && !document.hidden;
    prev = 0;
    renderer.setAnimationLoop(run ? frame : null);
  };
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    update();
  });
  const ro = new ResizeObserver(resize);
  document.addEventListener('visibilitychange', update);

  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', update);
    canvas.removeEventListener('webglcontextlost', dispose);
    scene.traverse((o) => {
      if (o instanceof Mesh || o instanceof Points || o instanceof LineSegments) {
        o.geometry.dispose();
        (o.material as Material).dispose();
      }
    });
    renderer.dispose();
    canvas.remove();
    delete el.dataset.brainReady;
  };
  canvas.addEventListener('webglcontextlost', dispose); // fall back to the poster

  el.append(canvas);
  resize();
  el.dataset.brainReady = ''; // CSS in BrainHero.astro fades the canvas in and the poster out
  io.observe(el);
  ro.observe(el);
  return dispose;
}
