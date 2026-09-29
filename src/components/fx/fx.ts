// Site-wide motion (loaded once from Base.astro). Everything runs inside gsap.matchMedia() handlers
// gated on prefers-reduced-motion: no-preference, so reduced motion gets the static page.
// matchMedia creates a gsap.context per handler and reverts it (tweens, ScrollTriggers, SplitText)
// when the query stops matching or on mm.revert(). See README.md in this folder.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

// ---- Tuning constants (documented in README.md) ----
const LENIS_LERP = 0.12;
const SPLIT_DURATION = 0.5;
const SPLIT_STAGGER = 0.035;
const SPLIT_OFFSET = 40; // yPercent each letter rises from
const AP_DURATION = 1.4;
const AP_START = 'top 85%';
const MAGNET_MAX = 6; // px
const MAGNET_DURATION = 0.25;
const TILT_MAX = 3; // deg
const TILT_DURATION = 0.2;

const MOTION = '(prefers-reduced-motion: no-preference)';
const mm = gsap.matchMedia();

mm.add(MOTION, () => {
  // Lenis smooth scroll, driven by gsap.ticker (which stops with rAF when the tab is hidden).
  const lenis = new Lenis({ lerp: LENIS_LERP });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // SplitText on the hero line. The split copy is aria-hidden; an sr-only copy keeps the heading readable.
  let srCopy: HTMLElement | undefined;
  const hero = document.querySelector<HTMLElement>('[data-fx-split]');
  if (hero) {
    srCopy = document.createElement('span');
    srCopy.className = 'sr-only';
    srCopy.textContent = hero.textContent?.trim() ?? '';
    hero.after(srCopy);
    const split = SplitText.create(hero, { type: 'words,chars', tag: 'span', aria: 'hidden' });
    gsap.from(split.chars, {
      yPercent: SPLIT_OFFSET,
      autoAlpha: 0,
      duration: SPLIT_DURATION,
      stagger: SPLIT_STAGGER,
      ease: 'power3.out',
    });
  }

  // DrawSVG action-potential dividers, drawn once when they scroll into view.
  gsap.utils.toArray<SVGSVGElement>('[data-fx-ap]').forEach((svg) => {
    gsap.from(svg.querySelectorAll('path'), {
      drawSVG: 0,
      duration: AP_DURATION,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: svg, start: AP_START, once: true },
    });
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    srCopy?.remove();
  };
});

// Magnetic buttons (including the band CTA): fine pointers only.
mm.add(`${MOTION} and (pointer: fine)`, () => {
  const offs = gsap.utils.toArray<HTMLElement>('.btn-primary, .btn-primary-on-band, .btn-secondary').map((btn) => {
    const x = gsap.quickTo(btn, 'x', { duration: MAGNET_DURATION, ease: 'power3.out' });
    const y = gsap.quickTo(btn, 'y', { duration: MAGNET_DURATION, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      x(gsap.utils.clamp(-1, 1, (e.clientX - r.left - r.width / 2) / (r.width / 2)) * MAGNET_MAX);
      y(gsap.utils.clamp(-1, 1, (e.clientY - r.top - r.height / 2) / (r.height / 2)) * MAGNET_MAX);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    return () => {
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
    };
  });
  return () => offs.forEach((off) => off());
});

// Poster-tilt on chips: hover-capable devices only; alternate direction per chip.
mm.add(`${MOTION} and (hover: hover)`, (context) => {
  const offs = gsap.utils.toArray<HTMLElement>('.chip').map((chip, i) => {
    // context.add() records tweens made later in event handlers, so mm.revert() resets them too.
    const tilt = (rotation: number) =>
      context.add(() => gsap.to(chip, { rotation, duration: TILT_DURATION, ease: 'power2.out', overwrite: 'auto' }));
    const enter = () => tilt(i % 2 ? TILT_MAX : -TILT_MAX);
    const leave = () => tilt(0);
    chip.addEventListener('pointerenter', enter);
    chip.addEventListener('pointerleave', leave);
    return () => {
      chip.removeEventListener('pointerenter', enter);
      chip.removeEventListener('pointerleave', leave);
    };
  });
  return () => offs.forEach((off) => off());
});

document.addEventListener('astro:before-swap', () => mm.revert(), { once: true });
