import z from "zod";

import { roundStatus } from "./constants";

const baseRoundSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  questionId: z.string(),
  number: z.number().int().positive(),
});

export const pendingRoundSchema = baseRoundSchema.extend({
  status: z.literal(roundStatus.pending),

  startedAt: z.null(),
  endsAt: z.null(),
  finishedAt: z.null(),
});

export const activeRoundSchema = baseRoundSchema.extend({
  status: z.literal(roundStatus.active),

  startedAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  finishedAt: z.null(),
});

export const finishedRoundSchema = baseRoundSchema.extend({
  status: z.literal(roundStatus.finished),

  startedAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  finishedAt: z.iso.datetime(),
});

export const roundSchema = z.discriminatedUnion("status", [
  pendingRoundSchema,
  activeRoundSchema,
  finishedRoundSchema,
]);

export type TRound = z.infer<typeof roundSchema>;