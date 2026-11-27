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
  // 正式域名，sitemap、canonical、RSS 均引用此配置
  site: 'https://a11.world',
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
