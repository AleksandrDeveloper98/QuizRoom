import z from "zod";

export const gamePlayerSchema = z.object({
  id: z.string(),

  gameId: z.string(),

  playerId: z.string(),

  score: z.number().int().nonnegative(),

  correctAnswers: z.number().int().nonnegative(),

  finalPlace: z.number().int().positive().nullable(),
});

export type TGamePlayer = z.infer<typeof gamePlayerSchema>;
