import * as z from "zod";

export const AcademyLessonSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string().optional(),
    description: z.string().optional(),
    lessonId: z.string().optional(),
    subjectId: z.string().min(3, {
        message: 'Subject is required'
    }),
});