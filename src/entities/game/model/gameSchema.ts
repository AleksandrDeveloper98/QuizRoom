import z from "zod";

import {
  gameDifficultyOptions,
  topicOptions,
} from "@/shared/config/quizOptions";

import {
  answerTimeSecSchema,
  roundsCountSchema,
} from "@/shared/lib/validation/quizValueSchemas";
import { gameStatusOptions } from "@/shared/config/quizOptions/quizOptions";

export const baseGameSchema = z.object({
  id: z.string(),

  roomId: z.string(),

  roundsCount: roundsCountSchema,

  answerTimeSec: answerTimeSecSchema,

  topic: z.enum(topicOptions),

  difficulty: z.enum(gameDifficultyOptions),

  startedAt: z.iso.datetime(),
});

export const playingGameSchema = baseGameSchema.extend({
  status: z.literal(gameStatusOptions.playing),

  finishedAt: z.null(),
});

export const finishedGameSchema = baseGameSchema.extend({
  status: z.literal(gameStatusOptions.finished),

  finishedAt: z.iso.datetime(),
});

export const gameSchema = z.discriminatedUnion("status", [
  playingGameSchema,
  finishedGameSchema,
]);

export type TGame = z.infer<typeof gameSchema>;
