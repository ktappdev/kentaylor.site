// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://kentaylor.dev',
  output: 'static',
  integrations: [react(), mdx(), sitemap(), vercel({ 
    imageOptimization: true
  })],
  image: {
    service: {
      name: 'vercel',
      options: {
        remotePatterns: [
          { hostname: 'kentaylor.dev' }
        ]
      }
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});