// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkQaContainers } from './src/lib/remark-qa.mjs'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // 部署后改成你的正式域名（Cloudflare Pages 自定义域名或 *.pages.dev）
  site: 'https://astro-a11-world-blog.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkQaContainers, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})
