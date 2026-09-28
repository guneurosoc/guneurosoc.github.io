# GU NeuroSoc website

## Preview mode

`PREVIEW` in `site.config.ts` is `true` until the committee launches the site. While it is on:

- every page shows a slim banner: "Preview — this site isn't launched yet";
- every page has `<meta name="robots" content="noindex">`;
- `/robots.txt` disallows all crawling.

To launch, set `export const PREVIEW = false;` and rebuild. That removes all three, and
`/robots.txt` then allows crawling and points to the sitemap.
