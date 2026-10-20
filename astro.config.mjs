import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aleksandrmakunin.ru',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/prices/') && !page.endsWith('/project/ai-seo-teacher/video/'),
    }),
  ],
});
