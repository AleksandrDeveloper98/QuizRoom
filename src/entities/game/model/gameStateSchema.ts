import z from "zod";
import { gameStatusOptions, topicOptions } from "@/shared/config/quizOptions";
import {
  answerTimeSecSchema,
  roundsCountSchema,
} from "@/shared/lib/validation/quizValueSchemas";
import { GAME_PHASE } from "./constants";

const answerIndexSchema = z.number().int().min(0).max(3);

const currentQuestionSchema = z.object({
  id: z.uuid(),
  topic: z.enum(topicOptions),
  question: z.string().trim().min(1),
  answerOptions: z.array(z.string().trim().min(1)).length(4),
});

const currentPlayerStateSchema = z.object({
  playerId: z.uuid(),
  selectedAnswerIndex: answerIndexSchema.nullable(),
});

const leaderboardPlayerSchema = z.object({
  playerId: z.uuid(),
  name: z.string().min(1),
  score: z.number().int().nonnegative(),
  hasAnswered: z.boolean(),
});

const baseGameStateSchema = z.object({
  id: z.uuid(),
  roomName: z.string(),
  roundsCount: roundsCountSchema,
  answerTimeSec: answerTimeSecSchema,
});

const playingGameStateSchema = baseGameStateSchema.extend({
  status: z.literal(gameStatusOptions.playing),
  currentRound: z.number().int().positive(),
  phaseEndsAt: z.iso.datetime(),
  currentQuestion: currentQuestionSchema,
  players: z.array(leaderboardPlayerSchema),
  me: currentPlayerStateSchema,
});

const answeringGameStateSchema = playingGameStateSchema.extend({
  phase: z.literal(GAME_PHASE.answering),
});

const revealGameStateSchema = playingGameStateSchema.extend({
  phase: z.literal(GAME_PHASE.reveal),

  currentQuestion: currentQuestionSchema.extend({
    correctAnswerIndex: answerIndexSchema,
  }),

  me: currentPlayerStateSchema.extend({
    responseTimeMs: z.number().int().nonnegative().nullable(),
    pointsEarned: z.number().int().nonnegative(),
  }),
});

const resultPlayerSchema = leaderboardPlayerSchema
  .omit({ hasAnswered: true })
  .extend({
    correctAnswersCount: z.number().int().nonnegative(),
    finalPlace: z.number().int().positive(),
  });

const finishedGameStateSchema = baseGameStateSchema.extend({
  roomId: z.uuid(),
  status: z.literal(gameStatusOptions.finished),

  players: z.array(resultPlayerSchema),

  me: z.object({
    playerId: z.uuid(),
  }),
});

export const gameStateSchema = z.union([
  z.discriminatedUnion("phase", [
    answeringGameStateSchema,
    revealGameStateSchema,
  ]),
  finishedGameStateSchema,
]);

export type TGameState = z.infer<typeof gameStateSchema>;
export type TLeaderboardPlayer = z.infer<typeof leaderboardPlayerSchema>;
export type TResultPlayer = z.infer<typeof resultPlayerSchema>;
