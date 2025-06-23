import * as z from "zod";

export const AcademyClassSchema = z.object({
    _id: z.string().optional(),
    id: z.string().min(1, {
        message: 'Unique id is required'
    }),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    version: z.string().optional(),
    level: z.string().min(3, {
        message: 'Title is required'
    }),
    segment: z.string().min(3, {
        message: 'Title is required'
    }),
    groups: z.array(z.string()).optional(),
    hasBatch: z.boolean().optional()
});