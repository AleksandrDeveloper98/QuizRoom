import z from "zod";
import { gameStatusArr } from "./constants";

export const gameSchema = z.object({
  id: z.string(),

  roomId: z.string(),

  status: z.enum(gameStatusArr),

  startedAt: z.iso.datetime(),

  finishedAt: z.iso.datetime().nullable(),
});

export type TGame = z.infer<typeof gameSchema>;
