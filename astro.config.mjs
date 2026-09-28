// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
