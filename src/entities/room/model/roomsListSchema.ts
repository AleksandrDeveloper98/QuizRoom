import z from "zod";
import { roomListItemSchema } from "./roomListItemSchema";

export const roomsListSchema = z.object({
  items: z.array(roomListItemSchema),

  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type TRoomsList = z.infer<typeof roomsListSchema>;
