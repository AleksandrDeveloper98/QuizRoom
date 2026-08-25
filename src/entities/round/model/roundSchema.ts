import z from "zod";
import { roundStatusOptions } from "./constants";

export const roundSchema = z.object({
  id: z.string(),

  gameId: z.string(),

  questionId: z.string(),

  number: z.number().int().positive(),

  status: z.enum(roundStatusOptions),

  startedAt: z.iso.datetime().nullable(),

  endsAt: z.iso.datetime().nullable(),

  finishedAt: z.iso.datetime().nullable(),
});

export type TRound = z.infer<typeof roundSchema>;
