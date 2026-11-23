import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

const dialogues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dialogues' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** 这次对话讨论的主题 */
    topic: z.string().optional(),
    /** 使用的模型，如 GLM-5.3 */
    model: z.string().optional(),
  }),
})

export const collections = { posts, dialogues }
