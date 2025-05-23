import * as z from "zod";

export const AcademyClassSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    version: z.string().optional(),
    level: z.string().min(3, {
        message: 'Title is required'
    }),
});