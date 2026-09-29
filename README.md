# GU NeuroSoc website

The official website of the Glasgow University Neuroscience Society (GU NeuroSoc). It tells
University of Glasgow students what the society is, how to join (membership is bought on the SRC
site), who the committee is and how to get in touch, and it carries the governance pages (Code of
Conduct, Complaints, Constitution, Privacy). Events and day-to-day updates live on Instagram, and
the site points there.

## Stack

- [Astro](https://astro.build) with TypeScript, static output only (no backend, no cookies, no
  third-party scripts)
- Tailwind CSS v4
- pnpm (the version is pinned in `package.json` → `packageManager`), Node 22 or newer
- Hosted on GitHub Pages as an organisation site, deployed by `.github/workflows/deploy.yml` on
  every push to `main`

## Editing without a terminal

Everything below can be done in the GitHub website. Open the file, click the pencil icon
("Edit this file"), make the change, then click "Commit changes…". For anything more than a typo,
choose "Create a new branch … and start a pull request" (see `CONTRIBUTING.md`). When the change
reaches `main`, the site rebuilds and goes live in a few minutes (watch the **Actions** tab).

The JSON files must stay valid JSON: every value in double quotes, commas between entries, no
comma after the last one. If a file is invalid the build fails, the Actions tab shows a red cross,
and the live site stays on the last good version.

### (a) Committee cards: `src/content/committee.json`

One entry per role (the Committee page always shows them in the order of the role list below,
whatever order they are in the file):

```json
[
  {
    "role": "President",
    "name": "Full name",
    "year": "Year of study, e.g. 3",
    "askMeAbout": "One line on what to ask this person about"
  }
]
```

- `role` must be exactly one of these six (spelling, capitals and hyphen included), and each role
  appears once:
  `President`, `Vice-President`, `Treasurer`, `Secretary`, `Academic Events Coordinator`,
  `Welfare Officer`.
- `name`, `year` and `askMeAbout` are free text.
- Any value that still looks like `{{SOMETHING}}` is a placeholder. Replace the whole thing,
  braces included, with the real text, and remove the matching line from `TODO.md`.

### (b) Previous committees: `src/content/previous-committees.json`

Starts as `[]`. At handover, add the outgoing committee at the top (newest first):

```json
[
  {
    "year": "2025/26",
    "members": [
      { "role": "President", "name": "Full name" },
      { "role": "Treasurer", "name": "Full name" }
    ]
  }
]
```

- `year` must be written as four digits, a slash, two digits (`2025/26`), and each year appears
  once.
- `role` here is free text (older committees may have had different roles); `name` is free text.

### (c) Instagram grid images: `public/instagram/`

The "Latest from Instagram" grid on the Home page shows every image in `public/instagram/`. The
images are copies saved from the society's Instagram; nothing is loaded from Instagram itself.

1. Open the `public/instagram` folder on GitHub and choose **Add file → Upload files**.
2. Upload a PNG or JPG (WebP and AVIF also work), named `slug-YYYY-MM-DD.png`, where the slug
   describes the post in lowercase words joined by hyphens and the date is the post date, e.g.
   `pub-quiz-2026-09-22.png`.
3. The name becomes the image's alt text: `pub-quiz-2026-09-22.png` is read out as
   "Instagram post from @guneurosci: pub quiz, 22 September 2026". A file not named this way still
   shows, with the plainer alt text "Instagram post from @guneurosci".
4. To take an image down, open it in that folder and delete the file.

Keep the grid to a handful of recent posts and nothing dated before 2026.

### (d) Switching preview off: `site.config.ts`

Change `export const PREVIEW = true;` to `export const PREVIEW = false;`. See "Preview mode" below
for exactly what that changes.

### (e) The site address: `site.config.ts`

`SITE_URL` is `'https://guneurosoc.github.io'`, served from the repository
`guneurosoc/guneurosoc.github.io` (an organisation site must be called `<org>/<org>.github.io`). If a custom domain is bought later, change `SITE_URL` to it; see
`HANDOVER.md`. `SITE_URL` is used for the sitemap, canonical links and share previews, so it must
match the address the site is actually served from.

## Preview mode

`PREVIEW` in `site.config.ts` is `true` until the committee launches the site. While it is on:

- every page shows a slim banner: "Preview — this site isn't launched yet";
- every page has `<meta name="robots" content="noindex">`;
- `/robots.txt` disallows all crawling.

To launch, set `export const PREVIEW = false;` and rebuild. That removes all three, and
`/robots.txt` then allows crawling and points to the sitemap.

## Local development

Needs Node 22 or newer and pnpm (`corepack enable` gives you the pinned version).

```sh
pnpm install        # also downloads an ffmpeg binary (~80 MB) for the video script
pnpm dev            # local server with live reload
pnpm build          # static site into dist/
pnpm preview        # serve dist/ locally
pnpm astro check    # type and content-schema checks
pnpm video:build    # re-encode the join video; see docs/VIDEO.md
```

## Placeholders

Facts the committee still has to supply appear on the site as `{{FIELD_NAME}}` and are listed in
`TODO.md`. Nothing about the society goes on the site until the committee confirms it.

## Licences

Third-party assets (3D brain model, animated emoji) and their licences are recorded in
`brand/ASSETS.md` and credited on the site's `/credits` page. Add any new asset to both.

## Docs

- `docs/TOOLING.md`: tooling and versions as observed during the build
- `docs/VIDEO.md`: replacing the join video and editing its captions
- `DESIGN.md`: web design decisions that sit on top of `brand/BRAND.md`
- `HANDOVER.md`: committee changeover, GitHub organisation, domain, what to do if the site breaks
- `CONTRIBUTING.md`: how to propose changes and what to check before merging
