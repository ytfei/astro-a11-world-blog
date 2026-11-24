// 站点全局配置，改这里即可
export const SITE_TITLE = '思考与对话'
export const SITE_SLOGAN = '丰沛时代，选择即品味。'
export const SITE_DESCRIPTION =
  '记录思考、分析，以及与 AI 对话后整理出的问答笔记'
export const SITE_AUTHOR = 'Mason'

// 各内容集合的展示名称
export const COLLECTION_LABELS: Record<string, string> = {
  posts: '文章',
  dialogues: '问答',
  wechat: '公众号',
}

// giscus 评论配置（免费，基于 GitHub Discussions）
// 前置步骤见 https://giscus.app/zh-CN ：
// 1. 把本仓库设为 Public，并安装 giscus App
// 2. 开启仓库的 Discussions
// 3. 在 giscus.app 上生成配置，替换下面占位值
export const GISCUS = {
  repo: 'ytfei/astro-a11-world-blog',
  repoId: 'R_kgDOV4TCpw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOV4TCp84DL0yl',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'zh-CN',
}
