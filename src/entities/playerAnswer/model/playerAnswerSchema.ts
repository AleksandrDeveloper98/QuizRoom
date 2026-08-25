import z from "zod";

export const playerAnswerSchema = z.object({
  id: z.string(),

  playerId: z.string(),

  roundId: z.string(),

  isCorrect: z.boolean(),

  selectedOptionId: z.string(),

  responseTimeMs: z.number().int().nonnegative(),

  scoreAwarded: z.number().int().nonnegative(),

  answeredAt: z.iso.datetime(),
});

export const submitPlayerAnswerSchema = playerAnswerSchema.pick({
  roundId: true,
  selectedOptionId: true,
});

export type TPlayerAnswer = z.infer<typeof playerAnswerSchema>;

export type TSubmitPlayerAnswer = z.infer<typeof submitPlayerAnswerSchema>;
