import * as z from "zod";

export const AcademySubjectSchema = z.object({
    _id: z.string().optional(),
    id: z.string().min(1, {
        message: 'Unique id is required'
    }),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string().optional(),
    hasSubjectPaper: z.boolean().optional(),
    subjectId: z.string().optional(),
    classId: z.string().optional(),
    segment: z.string().optional(),
});