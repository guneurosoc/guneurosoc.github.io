import type { APIRoute } from 'astro';
import { PREVIEW, SITE_URL } from '../../site.config';

export const GET: APIRoute = () =>
  new Response(
    PREVIEW
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
