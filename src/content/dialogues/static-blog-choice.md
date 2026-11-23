---
title: 示例：与 AI 讨论如何选静态博客方案
description: 展示问答整理格式：背景 → 关键问答 → 总结。
pubDate: 2026-11-23
tags: [示例, AI]
draft: false
topic: 静态博客方案选型
model: GLM
---

整理 AI 问答的推荐结构：先用一两句话交代背景，然后摘录关键问答（可裁剪），最后写你自己的结论。

:::question
静态博客框架这么多，为什么选 Astro？
:::

:::answer{model="GLM"}
Astro 的核心优势是「默认零 JS」：页面在构建时渲染成纯 HTML，只在需要交互的组件里按需加载 JS。对内容型博客来说，这意味着更快的加载速度和更好的 SEO。同时它原生支持 Markdown 内容集合（Content Collections），frontmatter 带类型校验，写错字段构建时直接报错。
:::

:::question
托管在 Cloudflare Pages 有什么需要注意的？
:::

:::answer{model="GLM"}
构建命令 `astro build`，产物目录 `dist`，无需任何服务端运行时。注意所有资源（CSS、JS、字体）都要自托管，不要引用外部 CDN，避免网络可达性问题。
:::

:::summary
结论：内容型博客选 Astro，部署选 Cloudflare Pages；所有静态资源自托管，不依赖外部 CDN。
:::
