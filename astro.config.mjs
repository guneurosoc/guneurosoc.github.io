// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: '/',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Never inline bundled scripts: the CSP (script-src 'self') blocks inline code.
    build: { assetsInlineLimit: 0 },
  },
});
