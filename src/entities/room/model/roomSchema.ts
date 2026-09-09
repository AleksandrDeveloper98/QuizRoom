import z from "zod";

import { maxPlayersSchema } from "./roomValueSchemas";

import {
  gameDifficultyOptions,
  roomAccessOptions,
  roomStatusOptions,
  topicOptions,
} from "@/shared/config/quizOptions";
import {
  answerTimeSecSchema,
  roundsCountSchema,
} from "@/shared/lib/validation/quizValueSchemas";

const roomNameSchema = z
  .string()
  .trim()
  .min(1, "Поле не может быть пустым")
  .max(15, "Максимум 15 символов");

export const roomSettingsSchema = z.object({
  name: roomNameSchema,

  maxPlayers: maxPlayersSchema,

  roundsCount: roundsCountSchema,

  answerTimeSec: answerTimeSecSchema,

  topic: z.enum(topicOptions),

  difficulty: z.enum(gameDifficultyOptions),

  access: z.enum(roomAccessOptions),
});

export const createRoomSchema = roomSettingsSchema
  .extend({
    password: z.string().trim().max(10, "Максимум 10 символов").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.access === "private" && !data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Для приватной комнаты нужен пароль",
      });
    }
  });

export const roomSchema = roomSettingsSchema.extend({
  id: z.uuid(),
  status: z.enum(roomStatusOptions),
  createdAt: z.iso.datetime(),
});

export type TRoom = z.infer<typeof roomSchema>;
export type TCreateRoom = z.infer<typeof createRoomSchema>;
