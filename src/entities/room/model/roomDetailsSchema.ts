import z from "zod";
import { roomParticipantSchema } from "@/entities/roomPlayer/model/roomParticipantSchema";
import { roomListItemSchema } from "./roomListItemSchema";

export const roomDetailsSchema = roomListItemSchema.extend({
  players: z.array(roomParticipantSchema),
});

export type TRoomDetails = z.infer<typeof roomDetailsSchema>;
