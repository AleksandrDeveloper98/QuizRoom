import type { TRoomDetails } from "@/entities/room/model/roomDetailsSchema";
import type { TRoomParticipant } from "@/entities/roomPlayer/model/roomParticipantSchema";

export type TLobbyProps = {
  room: TRoomDetails;
  roomId: string;
  currentPlayer: TRoomParticipant;
};
