import * as z from 'zod';

export const UnitSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    description: z.string().optional(),
    order: z.number().optional(),


    courseId: z.string().optional(),

});