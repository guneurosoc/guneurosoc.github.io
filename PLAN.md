# PLAN.md — Roadmap

> The task list. A checklist, not a diary. Paste new requests under "Up next" in plain English —
> Claude breaks them into concrete steps next time it reads this file.

Phases come from `BRIEF.md` `<phases>`. Commit after each phase.

---

## Current phase

**Phase 1: Tooling and design foundation**

- [x] List installed plugins, skills and MCP servers into `/docs/TOOLING.md`
- [x] Install the skills named in BRIEF.md `<motion>` (GreenSock's official GSAP skills; Open
      Design `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `creative-director`,
      `threejs`) if the repositories exist; record in `/docs/TOOLING.md` what installed and what
      didn't
- [x] Scaffold Astro (static output, TypeScript, Tailwind v4, pnpm, Node LTS)
- [x] brand-designer: implement `brand/BRAND.md` as `DESIGN.md` (website application only),
      `src/styles/tokens.css`, and self-hosted fonts from `brand/fonts/`
- [x] (unattended: summary in STATE.md "Needs the user's eyes") Stop and show the user `DESIGN.md` plus a screenshot or description of the token swatches
      before continuing
- [x] Commit phase 1

**Definition of done for this phase:** `/docs/TOOLING.md` exists and is accurate; Astro
scaffold builds; `DESIGN.md`, `src/styles/tokens.css` and self-hosted fonts exist and match
BRAND.md; the user has seen DESIGN.md and the swatches and said to continue; phase committed.

---

## Up next (not started)

- **Phase 2: Layout and pages** — global layout (header, nav, theme toggle, mobile drawer, skip
  link, footer); all eleven pages with the facts and `{{PLACEHOLDER}}`s; content collections
  with Zod schemas; join video pipeline; governance pages; `SITE_URL` and `PREVIEW` config.
- **Phase 3: Motion** — asset-scout finds and licences the brain model and Lotties
  (`ASSETS.md`); motion-3d builds the 3D brain hero and the page effects; `src/components/fx/README.md`.
- **Phase 4: QA, docs, deploy** — qa-auditor runs build checks, Lighthouse, accessibility and a
  visual pass and reports; fixes go back to the owning subagent; README, HANDOVER, CONTRIBUTING,
  PR template; GitHub Actions deploy workflow and `_headers`.
- **Phase 5: Final report** — every `{{PLACEHOLDER}}`, Lighthouse scores, the ASSETS.md licence
  table, which skills and plugins were actually used, and everything that could not be verified.

Full breakdown of each phase is in `QUEUE.md`.

---

## Explicitly not doing yet (phase-specific — see CLAUDE.md for permanent scope cuts)

- [ ] Nothing phase-specific yet.

---

## Completed

> Once a task is fully done and verified, move it here (or just to CHANGELOG.md — either is
> fine, whichever you find easier to glance at).

- [x] Resume system set up from BRIEF.md (2026-09-29)
