import type {
  accessRoomOptions,
  roomStatusOptions,
} from "@/shared/config/quizOptions";

export type TRoomAccess = (typeof accessRoomOptions)[number];

export type TRoomStatus = (typeof roomStatusOptions)[number];

export type TRoomDisplayStatus = TRoomStatus | "filled";

export type TRoomsListParams = {
  page: number;
  pageSize: number;
  search?: string;
  access?: TRoomAccess;
};
