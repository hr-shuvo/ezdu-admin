import * as z from "zod";

export const ChallengeSchema = z.object({
    _id: z.string().optional(),
    question: z.string().min(1, {
        message: "Question is required",
    }),
    type: z.string(),
    order: z.number(),
    lessonId: z.string(),

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
});
