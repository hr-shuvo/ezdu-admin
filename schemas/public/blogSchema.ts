import { z } from 'zod';

export const BlogSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required',
    }),
    subTitle: z.string().optional(),
    slug: z.string().min(1, {
        message: 'Slug is required',
    }),
    content: z.string().min(1, {
        message: 'Content is required',
    }),
    published: z.boolean(),
    metaDescription: z.string().optional(),
    coverImage: z.any().optional(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
});
