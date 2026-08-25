import z from "zod";
import { accessRoomArr, statusRoomArr } from "./constants";
import {
  answerTimeSecSchema,
  maxPlayersSchema,
  roundsCountSchema,
} from "./roomValueSchemas";
import { difficultyOptions, topicOptions } from "@/shared/config/quizOptions";

export const roomSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Поле не может быть пустым")
    .max(15, "Максимум 15 символов")
    .optional(),

  maxPlayers: maxPlayersSchema,

  roundsCount: roundsCountSchema,

  answerTimeSec: answerTimeSecSchema,

  topic: z.enum(topicOptions),

  difficulty: z.enum(difficultyOptions),

  access: z.enum(accessRoomArr),
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
  id: z.string(),
  name: z.string(),
  status: z.enum(statusRoomArr),
  createdAt: z.iso.datetime(),
});

export type TRoom = z.infer<typeof roomSchema>;
export type TCreateRoom = z.infer<typeof createRoomSchema>;
