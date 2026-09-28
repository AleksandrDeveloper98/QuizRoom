import type { TRoomDetails } from "@/entities/room/model/roomDetailsSchema";

export type TLobbyProps = {
  room: TRoomDetails;
  roomId: string;
};
