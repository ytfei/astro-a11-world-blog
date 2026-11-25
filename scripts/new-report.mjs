#!/usr/bin/env node
// 用法：pnpm report <html文件路径> [slug]
// 把一份整理好的 HTML 报告复制到 public/reports/，供 /reports/ 索引页展示。
// slug 可选，缺省用原文件名（不含扩展名）。
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [srcArg, slugArg] = process.argv.slice(2)

const usage = '用法：pnpm report <html文件路径> [slug]'
if (!srcArg) {
  console.error(usage)
  process.exit(1)
}

const src = resolve(srcArg)
if (!existsSync(src)) {
  console.error(`文件不存在：${src}`)
  process.exit(1)
}
if (extname(src).toLowerCase() !== '.html') {
  console.error('只支持 .html 文件')
  process.exit(1)
}

const slug =
  (slugArg || basename(src, '.html'))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || `report-${Date.now()}`

const dir = join(root, 'public/reports')
mkdirSync(dir, { recursive: true })

// 日期前缀：public/reports/YYYY-MM-DD-<slug>.html
const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
const datePrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
const dest = join(dir, `${datePrefix}-${slug}.html`)

if (existsSync(dest)) {
  console.error(`已存在：${dest}`)
  process.exit(1)
}
copyFileSync(src, dest)

// 提取 <title> 给用户看一眼，索引页构建时会再次读取
const html = readFileSync(src, 'utf8')
const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
const title = m ? m[1].trim() : ''

console.log(`已添加：public/reports/${datePrefix}-${slug}.html`)
if (title) console.log(`报告标题：${title}`)
console.log('本地构建后即可在 /reports/ 索引页看到该报告。')
