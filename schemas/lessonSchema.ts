import * as z from "zod";

export const LessonSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    // description: z.string().optional(),
    order: z.number().optional(),


    unitId: z.string().optional(),

});