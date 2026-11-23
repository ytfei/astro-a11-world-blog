---
title: 示例：一篇普通的思考文章
description: 这是文章摘要，会显示在首页列表和 RSS 里。
pubDate: 2026-11-23
tags: [示例, 随笔]
draft: false
---

这里写正文。删除这篇文章，开始写你自己的内容。

## 二级标题

普通 Markdown 语法全部支持：**加粗**、*斜体*、`行内代码`、列表、引用、表格等。

代码块由 Shiki 在构建时高亮（明暗两套主题），零运行时 JS：

```ts
const greeting = (name: string) => `你好, ${name}`
```

## 写作发布流程

1. 运行 `pnpm new post "文章标题"` 生成带 frontmatter 的模板；
2. 填写正文；
3. 写完把 `draft` 改成 `false`，push 到 GitHub 即自动发布。
