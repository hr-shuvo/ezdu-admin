import * as z from 'zod';

export const ModuleSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string(),
    totalCourse: z.number()

});