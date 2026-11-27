---
name: blog-publish
description: 把一篇现成的文章（链接或全文）自动整理并发布到 astro-a11-world-blog 博客：判断内容集合、提炼标题/摘要/标签、按规范命名和排版、构建验证、提交并部署。触发词：发到博客、发布博客、发博客、加进博客、加入博客、迁移文章、导入文章、公众号文章转博客、文章入库、同步到博客、publish to blog、add to blog、blog publish。用户提到把一篇文章（链接或全文）放进 astro-a11-world-blog 时使用。
---

# 博客发布技能（astro-a11-world-blog）

本技能封装了 astro-a11-world-blog 仓库的全部内容发布能力。给定一篇文章（URL 或全文），你可以自动完成：归类、提炼元信息、格式排版、写入仓库、构建验证、提交与部署。

## 前提：定位博客仓库

本技能操作的目标仓库是 **ytfei/astro-a11-world-blog**（GitHub: `git@github.com:ytfei/astro-a11-world-blog.git`，HTTPS: `https://github.com/ytfei/astro-a11-world-blog.git`）。按以下顺序定位，找到即停：

1. **用户指定的路径**：用户在对话中直接给出的目录；
2. **环境变量 `BLOG_REPO`**：若已设置，其值即仓库根目录；
3. **本机已知路径**：`/Users/mason/codebase/NexTech/astro-a11-world-blog`（作者的默认克隆位置）；
4. **快速搜索**：在用户主目录下按目录名 `astro-a11-world-blog` 搜索一层（如 `~/codebase/**/astro-a11-world-blog`），确认其含 `src/content/` 与 `astro.config.mjs`；
5. **克隆**：以上都没有时，询问用户克隆到哪个目录，默认建议 `~/codebase/astro-a11-world-blog`，然后 `git clone git@github.com:ytfei/astro-a11-world-blog.git`；
6. 仍然无法确定时，**停下来问用户**，不要猜测路径。

后续所有命令都在该仓库根目录执行。

## 环境要求

- 包管理器为 pnpm（Node ≥ 20）。
- 部署方式：push 到 GitHub 后 Cloudflare Pages 自动构建；本地也可 `pnpm deploy`（build + wrangler deploy，需要 Cloudflare 凭证）。

## 仓库结构速查

```
src/content/
  posts/      文章：原创思考与分析（深度长文）
  dialogues/  问答：与 AI 对话整理成的结构化笔记
  wechat/     公众号：市场复盘、财经评论类文章
src/consts.ts          站点标题、作者、giscus 评论配置
src/content.config.ts  三个集合的 frontmatter schema（zod 校验）
scripts/new-post.mjs   pnpm new 脚本，自动加日期前缀
```

## 第一步：判断目标集合

| 内容特征 | 集合 | 目录 |
|---|---|---|
| 原创思考、行业分析、产品思考、深度长文 | posts | `src/content/posts/` |
| 与 AI 的问答整理（有问有答、有结论） | dialogues | `src/content/dialogues/` |
| 公众号文章、每日/每周市场复盘、财经评论 | wechat | `src/content/wechat/` |

拿不准时问用户，并给出你的建议。

## 第二步：获取正文

- 输入是 URL：用 WebFetch 抓取正文，剥离广告、导航、推荐位等无关内容，保留标题、正文、发布日期。
- 输入是全文或文件：直接使用。
- 保留作者原有的行文风格与措辞，只做排版层的整理，不改写观点和数据。

## 第三步：提炼元信息

**文件命名（强制）**：`YYYY-MM-DD-标题.md`。日期取文章发布日（公众号以文内日期为准，未知则当天），如 `2026-11-24-hello.md`。标题中的标点（！？：""等）在文件名里去掉或换成 `-`。

**frontmatter 模板**：

```yaml
---
title: "文章标题"
description: "60–120 字摘要，概括核心观点或结论，用于列表页和 SEO"
pubDate: 2026-11-24T20:00:00+08:00
tags: [标签1, 标签2, 标签3]
draft: false
---
```

- `pubDate`：ISO 格式带 `+08:00` 时区。带分钟时间的用原文时间，否则取 20:00。
- `tags`：2–5 个。固定加集合标签（posts 可加「文章」或主题标签；wechat 一律带「公众号」，复盘类加「每日复盘」「盘后」），再按主题补充（金融、AI、英伟达、宏观、政策、黄金等）。
- `draft`：默认 `false`。内容粗糙、事实待核实时设 `true` 并告知用户。
- dialogues 集合额外支持可选字段：`topic`（讨论主题）、`model`（模型名）。

**description 提炼要点**：从首段或结论段浓缩；不写"本文介绍了"这类套话；保留关键数字与结论。

## 第四步：格式排版

- 正文不要重复 H1 标题（标题在 frontmatter 里），小节用 `##`。
- 支持 GFM 表格、代码块（Shiki 高亮）、行内与块级数学公式（`$...$` / `$$...$$`，KaTeX 渲染）。
- 问答集合用自定义容器：

  ```md
  :::question
  问题
  :::

  :::answer{model="GLM"}
  回答
  :::

  :::summary
  总结
  :::
  ```

- 公众号文章末尾的免责声明原样保留。
- 图片：引用仓库内图片放 `src/assets/`，用 `astro:assets` 的 `Image` 组件（仅 .astro 页面）；Markdown 正文中的外链图片可直接引用。
- YAML 注意：description 内不要出现未转义的英文双引号，用中文引号或「」。

## 第五步：写入与验证

```bash
cd <博客仓库>
# 直接写入 src/content/<collection>/YYYY-MM-DD-标题.md（带第三步的 frontmatter）
pnpm build   # 必须通过；frontmatter 不合 schema 会在此报错
```

构建失败时按报错修复（常见：YAML 引号、缺 title、pubDate 格式错）。

## 第六步：提交与发布

- 提交信息用一行式：`content: add <主题> article` 或 `content: add essay on <主题>`，与仓库现有风格一致。
- push 和 deploy 是对外可见动作，先征得用户同意：
  - `git push` → Cloudflare Pages 自动构建上线
  - 或 `pnpm deploy` → 本地直接部署到 Cloudflare Workers
- 上线后可用站点域名 `https://a11.world` 拼出文章 URL 告知用户。

## 示例

用户：把这篇公众号文章发到博客 https://mp.weixin.qq.com/s/xxx

1. WebFetch 抓正文 → 判定为公众号复盘 → wechat 集合
2. 提炼：title「市场底是跌出来的，政策底是吓出来的」，description 从首段浓缩，tags `[公众号, 每日复盘, 盘后, 金融, 政策]`
3. 写入 `src/content/wechat/2026-11-22-市场底是跌出来的政策底是吓出来的.md`
4. `pnpm build` 通过 → 提交 `content: add 市场底政策底复盘 article` → 经确认后 push
