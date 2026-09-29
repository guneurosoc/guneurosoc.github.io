# QUEUE.md — Drop-Anytime Task Queue

> **What this file is:** A simple ordered inbox for new instructions. Add to the bottom whenever
> you think of something — you don't need Claude to be free, and you don't need to wait for
> whatever it's currently doing to finish. This is different from PLAN.md: PLAN.md is the
> maintained roadmap; this is a raw, unsorted inbox that feeds INTO the roadmap.
>
> **How Claude uses this:** Whenever a session finishes a unit of work (or the whole current
> task), it checks this file BEFORE deciding what to do next — before falling back to whatever's
> next in PLAN.md. If there's something here, take the TOP item, remove it from this file, and
> either (a) fold it into PLAN.md as a proper broken-down task if it's substantial, or (b) just
> start on it directly if it's simple/self-contained. Then proceed exactly as you would with any
> other task — full STATE.md discipline applies.
>
> **How you use this:** Two ways —
> 1. Typing directly into a live Claude Code terminal session — Claude decides whether to act on
>    it immediately or (if mid-task) add it here to pick up next, your call which you'd prefer in
>    the moment, just say so if it matters.
> 2. Opening this file yourself and adding a line, any time, no Claude session needed at all —
>    just plain English, one item per line, oldest at top / newest at bottom.

---

## Queue (oldest at top — process in order unless one is explicitly marked urgent)

The items below are BRIEF.md `<phases>` broken into checkable steps. Delegate build work to the
subagents in `.claude/agents/`; quote the relevant BRIEF.md sections in each delegation.

### Phase 1 — Tooling and design foundation

- [x] List installed plugins, skills and MCP servers into `/docs/TOOLING.md`
- [x] Install GreenSock's official GSAP skills, if the repository exists; record result in `/docs/TOOLING.md`
- [x] Install the Open Design skills (`frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `creative-director`, `threejs`), if the repositories exist; record what installed and what didn't in `/docs/TOOLING.md`
- [x] Scaffold Astro: static output, TypeScript, Tailwind v4, pnpm, Node LTS; `site` from a single `SITE_URL` config value, `base` = `/`
- [x] brand-designer: write `DESIGN.md` — website application of `brand/BRAND.md` only (theme roles, dark/light themes, logo lock-up, favicon plan, poster-grammar usage); record any decision BRAND.md doesn't cover
- [x] brand-designer: write `src/styles/tokens.css` from `brand/brand-tokens.json` / `brand/brand.css`, wired to Tailwind v4
- [x] brand-designer: self-host Unbounded, Poppins and Archivo Black from `brand/fonts/` with their OFL licences
- [x] **STOP (unattended run: replaced by "Needs the user's eyes" in STATE.md per AUTONOMOUS.md):** show the user `DESIGN.md` and a screenshot or description of the token swatches; wait for go-ahead before phase 2
- [x] Commit phase 1

### Phase 2 — Layout and pages

- [x] page-builder: global layout — sticky header with lock-up, nav, light/dark toggle (localStorage in try/catch), mobile drawer, skip link
- [x] page-builder: footer — Instagram, Facebook, X, SRC join link; Code of Conduct, Complaints, Constitution, Privacy, Credits links; affiliation line; © current year
- [x] page-builder: `PREVIEW` flag (default true) — banner on every page, `noindex` meta, robots.txt disallow-all; all three removed when false
- [x] page-builder: content collections `src/content/committee.json` and `src/content/previous-committees.json` (seeded with schema, no entries) with Zod schemas
- [x] page-builder: Home — hero slot (poster image until phase 3), wordmark, one-line pitch from the About copy, CTAs "Become a member" → /join and "What's on → @guneurosci"; four aims cards; "Latest from Instagram" static grid from `/public/instagram/` linking to the profile with the follow line; join band; Glasgow Neuro one-liner
- [x] page-builder: About — four aims, full vs associate membership, equal-opportunities commitment, what we do; no history or founding year
- [x] (pipeline + page done) page-builder: Join — video pipeline from `/video/how-to-join.mp4` (MP4 ≤ 2 MB + WebM, poster frame, `.vtt` captions from the five steps, `<video controls playsinline preload="none">` in a portrait phone frame); five steps as text; SRC button; `{{PRICE}}`; associate note; `{{MS_FORMS_URL}}` and `{{CHAT_URL}}` buttons; page works without the video
- [x] page-builder: Committee — six role cards (President's name only, rest placeholders), neuron-style SVG placeholder avatars; "Previous committees" from the JSON; "Join the committee" explainer from the governance facts
- [x] page-builder: Contact — topic select (Outlook deep link omitted: untestable here) building a `mailto:` with subject and body; "Copy email" button; "Open in Outlook on the web" link only if tested and working; social links; `{{WELFARE_EMAIL}}` line; no map
- [x] page-builder: Code of Conduct — plain-English summary from `<facts>`, links to the SRC text and PDF
- [x] page-builder: Complaints — the process from `<facts>`, with the SRC procedure link
- [x] page-builder: Constitution — render `/content/constitution.docx` or `.md` verbatim with TOC and download links if present; otherwise download placeholder and adoption date 14 August 2026; never paraphrase
- [x] page-builder: Privacy — no cookies/analytics/forms; SRC handles membership and tickets (link); emails under the constitution's data-protection clause; localStorage for theme only
- [x] page-builder: Credits — every third-party asset with author, source URL and licence (from `ASSETS.md`)
- [x] page-builder: 404 — "This synapse doesn't connect."
- [x] page-builder: per-page meta, build-time OG images (satori + resvg endpoint, 12 PNGs), sitemap, robots, canonical URLs, JSON-LD Organization, CSP meta from `<technical>`
- [x] page-builder: create `/TODO.md` listing every `{{PLACEHOLDER}}` and "source logo file"
- [x] Verify: `astro check` clean, build passes, all eleven pages render (11 pages built 2026-09-29 00:59)
- [x] Commit phase 2

### Phase 3 — Motion

- [x] asset-scout: find a CC0 or CC-BY brain model (Sketchfab, NIH 3D), confirm licence, record author/URL/licence in `ASSETS.md`
- [x] asset-scout: find free Lottie decorations (done early; LottieFiles unreachable from the sandbox, three Animated Noto Emoji CC BY 4.0 used instead) on LottieFiles, confirm licences, record in `ASSETS.md`
- [x] motion-3d: 3D brain hero — black surface, glowing pink/blue/sky/violet node network, random and pointer-near firing, slow idle rotation, drag to spin, subtle bloom; lazy-loaded; static poster for reduced motion and no-WebGL
- [x] motion-3d: SplitText on the hero line; DrawSVG action-potential divider; magnetic buttons; synapse-glow on card hover/focus; poster-tilt on chips; Lottie decorations
- [x] motion-3d: every effect respects prefers-reduced-motion, pauses offscreen and on hidden tab; ≤ ~150 KB gzipped JS per page excluding the lazy 3D scene
- [x] motion-3d: document each effect and its tuning constants in `src/components/fx/README.md`
- [x] Verify: build passes, bundle size within budget (54.6–57.1 KB gz eager; brain chunk 155 KB lazy), poster present; WebGL behaviour unverified (no browser)
- [x] Commit phase 3

### Phase 4 — QA, docs, deploy

- [ ] qa-auditor: build checks, `astro check`, HTML validation, link check, CSP check
- [ ] qa-auditor: Lighthouse mobile — Home Performance ≥ 90, others ≥ 95; Accessibility, Best Practices, SEO 100
- [ ] qa-auditor: accessibility pass — one h1 per page, focus rings, 44 px tap targets, alt text, colour never the only signal; keyboard test of nav and toggle
- [ ] qa-auditor: visual pass (browser plugin if installed) in dark and light themes
- [ ] Route each QA finding back to the owning subagent; re-run QA until clean
- [x] page-builder: `README.md` (edit committee JSON, add Instagram images via GitHub web UI, switch `PREVIEW` off), `HANDOVER.md`, `CONTRIBUTING.md`, PR template
- [x] page-builder: GitHub Actions deploy workflow on push to main (Pages source: GitHub Actions); no CNAME; `_headers` file for Cloudflare Pages portability
- [ ] Commit phase 4

### Phase 5 — Final report

- [ ] Report to the user: every `{{PLACEHOLDER}}`, Lighthouse scores, the `ASSETS.md` licence table, which skills and plugins were actually used, everything that could not be verified, and any decisions made outside BRAND.md
- [ ] Commit phase 5

---

## Recently pulled from queue (optional — just for your own tracking, not required)

> When an item is taken off the queue, you can optionally log it here so you can see at a glance
> what's been picked up recently, rather than only finding it buried inside PLAN.md/CHANGELOG.md.

-
