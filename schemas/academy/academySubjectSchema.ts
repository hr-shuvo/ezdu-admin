import * as z from "zod";

export const AcademySubjectSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string().optional(),
    hasSubjectPaper: z.boolean().optional(),
    subjectId: z.string().optional(),
    classId: z.string().optional(),
});