import type { roomAccessOptions } from "@/shared/config/quizOptions";

type TAccessRoom = (typeof roomAccessOptions)[number];

export type TRoomsListParams = {
  page: number;
  pageSize: number;
  search?: string;
  access?: TAccessRoom;
};
