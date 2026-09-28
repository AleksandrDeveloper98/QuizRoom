import z from "zod";
import { roomPlayerRoleOptions } from "./constants";

export const roomParticipantSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  role: z.enum(roomPlayerRoleOptions),
  isReady: z.boolean(),
});

export type TRoomParticipant = z.infer<typeof roomParticipantSchema>;
