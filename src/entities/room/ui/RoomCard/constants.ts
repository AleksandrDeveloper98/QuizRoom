import type { TRoomDisplayStatus } from "@/entities/room/model/types";
import type { TBadgeVariant } from "@/shared/ui/Badge/types";

export const roomCardStatus = {
  playing: "red",
  waiting: "green",
  filled: "yellow",
} satisfies Record<TRoomDisplayStatus, TBadgeVariant>;
