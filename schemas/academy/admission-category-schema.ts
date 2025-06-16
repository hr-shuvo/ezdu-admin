import * as z from "zod";

export const AdmissionCategorySchema = z.object({
    _id: z.string().optional(),
    id: z.string().min(1, {
        message: 'Title is required and unique'
    }),
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    description: z.string().optional(),
    segment: z.string().min(1, {
        message: 'Segment is required'
    }),
    subjects: z.array(z.any()).optional(),
});