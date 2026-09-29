// Build-time Open Graph images: satori (element tree → SVG) then resvg (SVG → PNG).
// Runs only during `astro build`; nothing here ships to the browser.
import fs from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute, GetStaticPaths } from 'astro';
import { OG_PAGES, OG_SUBTITLE } from '../../og-pages';

// Paths are relative to the project root (astro build runs there; import.meta.url moves once bundled).
const read = (p: string) => fs.readFileSync(p);
const fonts = [
  // Satori can't parse variable fonts (fvar), so this is a static wght=900 instance of
  // brand/fonts/Unbounded[wght].ttf, made with subset-font 2.9.0 (harfbuzz), U+0020-00FF plus
  // – — ‘ ’ “ ” … € ™. Regenerate it if a title needs other characters.
  { name: 'Unbounded', data: read('src/assets/og/Unbounded-900.ttf'), weight: 900 as const },
  { name: 'Poppins', data: read('brand/fonts/Poppins-SemiBold.ttf'), weight: 600 as const },
];
const logo = `data:image/png;base64,${read('public/logo.png').toString('base64')}`;

const C = {
  night: '#0A0716', cream: '#FEFADD', navy: '#241D52', mist: '#B4AED6',
  lavender: '#E698FD', black: '#000000',
  pink: '#FE67C6', blue: '#4F6FFE', sky: '#8AD2FE', violet: '#5D16E9',
};

type El = { type: string; props: { style?: Record<string, unknown>; children?: unknown; [k: string]: unknown } };
const div = (style: Record<string, unknown>, children?: unknown): El => ({ type: 'div', props: { style, children } });

// DESIGN.md §4 striped border: 40 px lavender/black blocks, 24 px tall.
const stripe = (edge: 'top' | 'bottom') =>
  div(
    { position: 'absolute', [edge]: 0, left: 0, width: 1200, height: 24, display: 'flex' },
    Array.from({ length: 30 }, (_, i) => div({ width: 40, height: 24, backgroundColor: i % 2 ? C.black : C.lavender })),
  );

// A few network nodes (DESIGN.md §4 "other motifs").
const dots = [
  [80, 70, 10, C.pink], [1110, 560, 12, C.blue], [760, 520, 8, C.sky], [690, 90, 9, C.violet], [1140, 80, 7, C.pink],
].map(([x, y, r, c]) =>
  div({ position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: 9999, backgroundColor: c }),
);

function card(title: string): El {
  // Text column is ~700 px. Unbounded 900 caps average ~0.86 em per letter ("CONSTITUTION" is
  // 9.90 em, DESIGN.md §2), so fit the longest word; multi-word titles wrap between words.
  const longest = Math.max(...title.split(' ').map((w) => w.length));
  const size = Math.min(80, Math.floor(700 / (longest * 0.86)));
  const offset = Math.max(2, Math.round(size * 0.04));
  return div(
    { width: 1200, height: 630, display: 'flex', alignItems: 'center', backgroundColor: C.night, position: 'relative', padding: '0 72px' },
    [
      stripe('top'),
      stripe('bottom'),
      ...dots,
      div({ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 48 }, [
        div(
          {
            fontFamily: 'Unbounded', fontWeight: 900, fontSize: size, lineHeight: 1.05, color: C.cream,
            textTransform: 'uppercase', textShadow: `${offset}px ${offset}px 0 ${C.navy}`,
          },
          title,
        ),
        div({ fontFamily: 'Poppins', fontWeight: 600, fontSize: 30, color: C.mist, marginTop: 28 }, OG_SUBTITLE),
      ]),
      { type: 'img', props: { src: logo, width: 300, height: 300, style: { borderRadius: 9999 } } },
    ],
  );
}

export const getStaticPaths = (() =>
  Object.entries(OG_PAGES).map(([slug, title]) => ({ params: { slug }, props: { title } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(card(props.title as string) as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
