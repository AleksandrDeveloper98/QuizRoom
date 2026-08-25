import { difficultyOptions, topicOptions } from "@/shared/config/quizOptions";
import z from "zod";

const answerOptionSchema = z.object({
  id: z.string(),

  text: z.string().trim().min(1),
});

export const baseQuestionSchema = z.object({
  id: z.string(),

  text: z.string().trim().min(1),

  answerOptions: z.array(answerOptionSchema).length(4),

  difficulty: z.enum(difficultyOptions),

  topic: z.enum(topicOptions),
});

export const questionSchema = baseQuestionSchema
  .extend({
    correctOptionId: z.string(),
    explanation: z.string().trim().min(1),
  })
  .superRefine((question, ctx) => {
    const correctOptionExists = question.answerOptions.some(
      (option) => option.id === question.correctOptionId,
    );
    if (!correctOptionExists) {
      ctx.addIssue({
        code: "custom",
        path: ["correctOptionId"],
        message: "Правильный ответ отсутствует среди вариантов",
      });
    }
  });

export type TQuestion = z.infer<typeof questionSchema>;

export type TActiveQuestion = z.infer<typeof baseQuestionSchema>;
