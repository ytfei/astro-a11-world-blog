// 站点全局配置，改这里即可
export const SITE_TITLE = '思考与对话'
export const SITE_DESCRIPTION =
  '记录思考、分析，以及与 AI 对话后整理出的问答笔记'
export const SITE_AUTHOR = 'Mason'

// giscus 评论配置（免费，基于 GitHub Discussions）
// 前置步骤见 https://giscus.app/zh-CN ：
// 1. 把本仓库设为 Public，并安装 giscus App
// 2. 开启仓库的 Discussions
// 3. 在 giscus.app 上生成配置，替换下面占位值
export const GISCUS = {
  repo: 'your-github-name/your-repo-name', // TODO
  repoId: '', // TODO
  category: 'Announcements', // TODO
  categoryId: '', // TODO
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
}
