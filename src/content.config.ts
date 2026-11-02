import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({
    base: './courses',
    pattern: '*/course.yaml',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    cover: z.string().trim().regex(/^\/(?!\/).+/, "封面路徑必須以 / 開頭，對應 public/ 下的檔案").optional(),
    order: z.number(),
    tagline: z.string(),
    description: z.string(),
    audience: z.string(),
    duration: z.number().positive(),
    tags: z.array(z.string()),
    topics: z.array(z.string()),
    learningGoals: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    materials: z.array(z.object({
      label: z.string(),
      href: z.string(),
      category: z.enum(['slides', 'lab', 'resources']),
      description: z.string().optional(),
    })).min(1),
  }),
});

const lessons = defineCollection({
  loader: glob({ base: './courses', pattern: '*/*.md' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { courses, lessons };
