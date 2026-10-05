import type { TRoomParticipant } from "@/entities/roomPlayer/model/roomParticipantSchema";

export type TLobbyPlayersPanelProps = {
  players: TRoomParticipant[];
  currentPlayer: TRoomParticipant;
};
