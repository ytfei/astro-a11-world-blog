import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const published = (
    await Promise.all([getCollection('posts'), getCollection('dialogues'), getCollection('wechat')])
  )
    .flat()
    .filter((e) => !e.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: published.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `/${entry.collection}/${entry.id}/`,
      categories: entry.data.tags,
    })),
    customData: '<language>zh-CN</language>',
  })
}
