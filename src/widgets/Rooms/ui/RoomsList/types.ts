import type { TRoomListItem } from "@/entities/room/model/roomListItemSchema";

export type TRoomsListProps = {
  rooms: TRoomListItem[];
  pendingRoomId: string | null;
  isJoinPending: boolean;
  onJoin: (room: TRoomListItem) => void;
};
