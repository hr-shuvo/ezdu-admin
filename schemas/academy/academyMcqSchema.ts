import * as z from "zod";

export const AcademyMcqSchema = z.object({
    _id: z.string().optional(),
    question: z.string().min(1, {
        message: "Question is required",
    }),
    order: z.number().optional(),
    subjectId: z.string(),
    lessonId: z.string().optional(),
    passage: z.string().optional(),
    description: z.string().optional(),
    imageData:z.any().optional(),

    optionList: z
        .array(
            z.object({
                text: z.string().min(1, {
                    message: "Option text is required",
                }),
                correct: z.boolean(),
            })
        )
        .min(2, {
            message: "At least two options are required",
        })
        .refine((option) => option.some((opt) => opt.correct), {
            message: "At least one option must be correct",
        }),

    instituteIds: z.array(z.any()).optional(),
    modelTestIds: z.array(z.string()).optional()
});
