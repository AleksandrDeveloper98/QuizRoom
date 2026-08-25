import z from "zod";

const answerOptionSchema = z.object({
  id: z.string().min(1),

  text: z.string().trim().min(1),
});

export const answerOptionsSchema = z
  .array(answerOptionSchema)
  .length(4)
  .superRefine((options, ctx) => {
    const optionIds = options.map((option) => option.id);

    const uniqueOptionIds = new Set(optionIds);

    if (optionIds.length !== uniqueOptionIds.size) {
      ctx.addIssue({
        code: "custom",
        message: "ID вариантов ответов должны быть уникальными",
      });
    }
  });
