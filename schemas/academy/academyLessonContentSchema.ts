import * as z from "zod";

export const AcademyLessonContentSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
    text1: z.string().optional(),
    text2: z.string().optional(),
    text3: z.string().optional(),
    text4: z.string().optional(),
    text5: z.string().optional(),
    lessonId: z.string().optional(),
}); 