# CLAUDE.md — Project Constitution

> Read this FIRST, every session, in full. Rarely changes. Paste new hard rules in any time.

---

## 1. Project in one paragraph

The official static website for the Glasgow University Neuroscience Society (GU NeuroSoc), a
student society affiliated to the Glasgow University Students' Representative Council. It tells
University of Glasgow students what the society is, how to join (membership is bought on the SRC
site), who the committee is, how to get in touch, and carries the governance pages (Code of
Conduct, Complaints, Constitution, Privacy). Built with Astro, TypeScript and Tailwind v4, hosted
on GitHub Pages. `BRIEF.md` is the complete, authoritative spec; `brand/BRAND.md` is the brand
guide it depends on. Read both in full before doing any build work.

---

## 2. Hard rules — never break these

> Scope cuts and "don't touch this" list. A fresh Claude session with zero memory will do the
> sensible-sounding thing unless told not to — this is what stops it.

### No-invention rule (verbatim from BRIEF.md)

<no_invention_rule>
This is a public website for a real student society, and anything it states will be read as the committee's word. An invented founding year, member count, price, event date, name, quote or statistic would mislead students and embarrass the committee, so no fact about the society appears unless it is in <facts> below or in a file I have put in `/brand`, `/content` or `/video`. Where a fact is needed and missing, put a visible `{{FIELD_NAME}}` placeholder in the page and add it to `/TODO.md`. The same goes for technical claims: library versions, licence terms, asset URLs and whether a skill installed are recorded as actually observed, and anything you could not verify is listed as unverified in the final report. Placeholder copy must not read like a fact (no "Est. 20XX", no sample testimonials, no invented stats).
</no_invention_rule>

(`<facts>` refers to the `<facts>` section of `BRIEF.md`.)

### Scope (verbatim from BRIEF.md)

<scope>
Static site only: no backend, no login, no forms that post anywhere, no cookies, no third-party scripts at runtime. The committee chose this so there is nothing to secure or maintain beyond the GitHub repo.

Pages, and only these: Home, About, Join, Committee, Contact, Code of Conduct, Complaints, Constitution, Privacy, Credits, 404.

Deliberately out of scope for now (the committee cannot keep them updated yet): an events hub, a learning/resources hub, an opportunities board, a research-groups directory. Updates live on Instagram and the site points there. If you think one of these is needed, say so in a report; don't build it.

Nothing dated before 2026 appears on the site, except in the previous-committees archive on the Committee page, which may go back further.

Keep each change to what its task asks for. If a subagent finds a pre-existing problem or a worthwhile extra, it reports it as a follow-up rather than building it. Verify however is useful; scratch scripts need not be kept, and don't commit extra test files beyond what the build and QA tooling need.
</scope>

### Brand

- `brand/BRAND.md` is the source of truth for the look (colour, type, logo use, poster style,
  motifs, tone) and must not be edited. If the site needs something BRAND.md doesn't cover,
  decide in its spirit, record the decision in `DESIGN.md`, and list it in the final report so
  the committee can add it to the guide.

---

## 3. Explicitly NOT doing yet

- Events hub, learning/resources hub, opportunities board, research-groups directory (see
  `<scope>` above — report if needed, don't build).
- Custom domain and CNAME: set in the repository's Pages settings when bought, not in the repo.
- Any Instagram or other third-party embed (cookies, CSP).
- Handling payment or membership data of any kind — the SRC site does that.

---

## 4. The other files — read in this order every session

1. **STATE.md** — where the last session stopped, exactly.
2. **QUEUE.md** — the inbox; anything in it takes priority.
3. **PLAN.md** — current phase only, not history.
4. **CHANGELOG.md** — skim recent entries.

Full protocol lives in `INSTRUCTIONS.md`. `AUTONOMOUS.md` applies on unattended runs.

---

## 5. Decision log (optional)

> One-line entries for decisions that aren't obvious from the code.

- 2026-09-29: `BRIEF.md` (v6) is the authoritative spec; `PLAN.md`/`QUEUE.md` were filled from
  its `<phases>` section. Build work is delegated to the subagents in `.claude/agents/`.
