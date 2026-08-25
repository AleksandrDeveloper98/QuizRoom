import z from "zod";
import { roleRoomPlayerArr } from "./constants";

export const roomPlayerSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  playerId: z.string(),
  role: z.enum(roleRoomPlayerArr),
  isReady: z.boolean(),
});

export type TRoomPlayer = z.infer<typeof roomPlayerSchema>;
