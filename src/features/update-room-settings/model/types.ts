import type { TUpdateRoom } from "@/entities/room/model/roomSchema";

type TUpdateRoomPayload = Partial<TUpdateRoom>;

export type TUpdateRoomVariables = {
  roomId: string;
  payload: TUpdateRoomPayload;
};
