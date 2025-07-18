import * as z from "zod";

export const AcademyInstituteSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string(),
    description: z.string(),
    type: z.string().min(3, {
        message: 'Type is required'
    }),
});

export const AcademyModelTestSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    subTitle: z.string(),
    description: z.string().optional(),
    instituteId: z.string().optional(),
    subjectId: z.string().min(1, {
        message: 'Subject is required'
    }),
    year: z.string()
    
});