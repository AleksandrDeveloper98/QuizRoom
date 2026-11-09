import z from "zod";

import {
  questionDifficultyOptions,
  topicOptions,
} from "@/shared/config/quizOptions";
import { answerOptionsSchema } from "./questionValueSchema";

const baseQuestionSchema = z.object({
  id: z.string(),

  text: z.string().trim().min(1),

  answerOptions: answerOptionsSchema,

  difficulty: z.enum(questionDifficultyOptions),

  topic: z.enum(topicOptions),
});

export const activeQuestionSchema = baseQuestionSchema;

export const questionSchema = baseQuestionSchema
  .extend({
    correctOptionId: z.string().min(1),
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

export type TActiveQuestion = z.infer<typeof activeQuestionSchema>;
