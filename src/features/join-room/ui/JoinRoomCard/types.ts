import type { TRoomListItem } from "@/entities/room/model/roomListItemSchema";

export type TJoinRoomCardProps = {
  room: TRoomListItem;
  onJoin: () => void;
  isPending: boolean;
  isJoinDisabled: boolean;
};
