#!/usr/bin/env node
// 用法：pnpm new post "标题"   → 生成文章草稿
//       pnpm new dialogue "标题" → 生成问答草稿
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [type, ...titleParts] = process.argv.slice(2)
const title = titleParts.join(' ').trim()

const usage = '用法：pnpm new post|dialogue "标题"'
if (!title || !['post', 'dialogue'].includes(type)) {
  console.error(usage)
  process.exit(1)
}

const dir = join(root, 'src/content', type === 'post' ? 'posts' : 'dialogues')
const slug =
  title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || `untitled-${Date.now()}`
const filePath = join(dir, `${slug}.md`)

if (existsSync(filePath)) {
  console.error(`已存在：${filePath}`)
  process.exit(1)
}
mkdirSync(dir, { recursive: true })

const today = new Date().toISOString().slice(0, 10)
const frontmatter =
  type === 'post'
    ? `---
title: "${title}"
description: ""
pubDate: ${today}
tags: []
draft: true
---
`
    : `---
title: "${title}"
description: ""
pubDate: ${today}
tags: []
draft: true
topic: ""
model: ""
---
`

const body =
  type === 'post'
    ? '\n在这里写正文。\n'
    : `
:::question
问题一
:::

:::answer{model="GLM"}
回答一
:::

:::summary
你的总结。
:::
`

writeFileSync(filePath, frontmatter + body)
console.log(`已创建：${filePath}\n下一步：编辑内容，发布时把 draft 改为 false。`)
