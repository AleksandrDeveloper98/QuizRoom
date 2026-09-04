import z from "zod";
import { roomSchema } from "./roomSchema";

export const roomListItemSchema = roomSchema
  .pick({
    id: true,
    name: true,
    status: true,
    maxPlayers: true,
    roundsCount: true,
    answerTimeSec: true,
    topic: true,
    difficulty: true,
    access: true,
  })
  .extend({
    playersCount: z.number().int().nonnegative(),
  });

export type TRoomListItem = z.infer<typeof roomListItemSchema>;
