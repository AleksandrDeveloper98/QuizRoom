import z from "zod";

export const startGameResponseSchema = z.object({
  gameId: z.uuid(),
});

export type TStartGameResponse = z.infer<typeof startGameResponseSchema>;
