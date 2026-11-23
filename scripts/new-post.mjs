#!/usr/bin/env node
// 用法：pnpm new post "标题"   → 生成文章草稿
//       pnpm new dialogue "标题" → 生成问答草稿
//       pnpm new wechat "标题" → 生成公众号草稿
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [type, ...titleParts] = process.argv.slice(2)
const title = titleParts.join(' ').trim()

const usage = '用法：pnpm new post|dialogue|wechat "标题"'
if (!title || !['post', 'dialogue', 'wechat'].includes(type)) {
  console.error(usage)
  process.exit(1)
}

const dirMap = { post: 'posts', dialogue: 'dialogues', wechat: 'wechat' }
const dir = join(root, 'src/content', dirMap[type])

const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
const offsetMin = -now.getTimezoneOffset()
const offset = `${offsetMin >= 0 ? '+' : '-'}${pad(Math.floor(Math.abs(offsetMin) / 60))}:${pad(Math.abs(offsetMin) % 60)}`
// 本地日期，如 2026-11-24，用于文件名前缀
const datePrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
// 带时区的本地时间戳，如 2026-11-23T21:30:05+08:00
const timestamp = `${datePrefix}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${offset}`

const slug =
  title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || `untitled-${Date.now()}`
const filePath = join(dir, `${datePrefix}-${slug}.md`)

if (existsSync(filePath)) {
  console.error(`已存在：${filePath}`)
  process.exit(1)
}
mkdirSync(dir, { recursive: true })

const frontmatter =
  type === 'dialogue'
    ? `---
title: "${title}"
description: ""
pubDate: ${timestamp}
tags: []
draft: true
topic: ""
model: ""
---
`
    : `---
title: "${title}"
description: ""
pubDate: ${timestamp}
tags: []
draft: true
---
`

const body =
  type === 'dialogue'
    ? `
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
    : '\n在这里写正文。\n'

writeFileSync(filePath, frontmatter + body)
console.log(`已创建：${filePath}\n下一步：编辑内容，发布时把 draft 改为 false。`)
