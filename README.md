# 思考与对话

个人博客：记录思考、分析，以及与 AI 对话后整理出的问答笔记。构建工具 [Astro](https://astro.build)，托管 [Cloudflare Pages](https://pages.cloudflare.com)。

## 常用命令

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 本地开发（http://localhost:4321） |
| `pnpm build` | 构建到 `dist/` |
| `pnpm preview` | 用 wrangler 本地预览构建产物 |
| `pnpm new post "标题"` | 新建文章草稿 |
| `pnpm new dialogue "标题"` | 新建问答草稿 |

## 写作流程

1. `pnpm new post "标题"` 或 `pnpm new dialogue "标题"` 生成草稿（`draft: true`，不会发布）；
2. 编辑 `src/content/posts/` 或 `src/content/dialogues/` 下的 md 文件；
3. 发布：把 frontmatter 里 `draft` 改为 `false`，push 到 GitHub，Cloudflare Pages 自动构建上线。

### 问答整理格式

问答文章用自定义容器语法渲染成气泡：

```md
:::question
问题
:::

:::answer{model="GLM"}
回答（model 可选，显示为标签）
:::

:::summary
你的总结。
:::
```

推荐结构：背景交代 → 关键问答（可裁剪）→ 自己的结论。

## 部署（Cloudflare Pages）

1. 把仓库推到 GitHub（Public，giscus 评论需要）；
2. Cloudflare Dashboard → Workers & Pages → 创建 Pages 项目 → 连接 Git 仓库；
3. 构建配置：Build command `pnpm build`，Output directory `dist`（框架预设选 Astro 亦可）；
4. 部署完成后在 `astro.config.mjs` 的 `site` 改成实际域名（影响 sitemap/RSS/canonical）。

所有 CSS/JS 均构建期自托管，无外部 CDN 依赖。

## 启用评论（giscus，免费）

前置：仓库 Public + 安装 [giscus App](https://github.com/apps/giscus) + 开启 Discussions。然后到 [giscus.app](https://giscus.app/zh-CN) 生成配置，填入 `src/consts.ts` 的 `GISCUS`（repo / repoId / category / categoryId）。

## 目录结构

```
src/
├── content.config.ts      # 内容集合 schema（posts / dialogues）
├── content/
│   ├── posts/             # 思考、分析类文章
│   └── dialogues/         # AI 问答整理
├── layouts/               # BaseLayout / ArticleLayout
├── components/            # Header / Footer / Giscus 等
├── lib/remark-qa.mjs      # 问答气泡渲染插件
├── pages/                 # 首页、详情页、标签、关于、RSS
└── consts.ts              # 站点标题、giscus 配置
```
