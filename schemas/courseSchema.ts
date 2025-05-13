import * as z from 'zod';

export const CourseSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string().optional(),
    imageSrc: z.string().min(1, {
        message: 'Image Src is required'
    }),

    moduleId: z.string().optional(),

});