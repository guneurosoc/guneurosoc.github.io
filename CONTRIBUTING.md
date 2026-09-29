# Contributing

Thanks for helping with the GU NeuroSoc website. Read `README.md` first; it explains how to make
the common edits.

## How to propose a change

1. Make the change on a new branch. In the GitHub web UI: edit the file, click "Commit changes…",
   and choose "Create a new branch for this commit and start a pull request".
2. Open the pull request and fill in the checklist in the template.
3. Another committee member reviews it. (The build only runs after merging, so for anything
   beyond a text or JSON edit, run the checks below first.)
4. Merge into `main`. Every push to `main` builds and deploys the live site automatically.

## No invented facts

This is the society's public website, and everything on it is read as the committee's word. Do not
add any fact about the society (names, dates, prices, member counts, quotes, statistics, links)
that the committee has not confirmed. Where a fact is needed but not yet confirmed, put a visible
`{{FIELD_NAME}}` placeholder in the page and add a line for it to `TODO.md`. Placeholder text must
not look like a real fact.

## Brand

`brand/BRAND.md` is the society's brand guide and is not edited in this repository. Web-specific
decisions that the brand guide doesn't cover (spacing, motion, component styles) are recorded in
`DESIGN.md`. Use the colours and type in `src/styles/tokens.css`; don't invent new ones.

## Scope

The site has eleven pages and only these: Home, About, Join, Committee, Contact, Code of Conduct,
Complaints, Constitution, Privacy, Credits and 404. There is deliberately no events hub,
learning/resources hub, opportunities board or research-groups directory; events and updates live
on Instagram and the site links there. The site stays static: no backend, no logins, no forms that
submit anywhere, no cookies, and no third-party scripts or embeds.

## Checks before merging

For anything beyond a text or JSON edit, run locally:

```sh
pnpm astro check
pnpm build
```

Both must finish without errors. The deploy workflow runs the same two commands, so a change
that fails them after merging will not go live (the previous version stays up).

## Accessibility basics

- Every image has meaningful alt text (or empty `alt=""` if purely decorative).
- Headings go in order (one `h1` per page, then `h2`, `h3`); don't skip levels for styling.
- Links say where they go ("Join on the SRC website", not "click here").
- Text keeps enough contrast against its background; use the existing colour tokens.
- Everything works with a keyboard alone, with a visible focus outline.
- Motion respects the "reduce motion" setting; video has captions.
