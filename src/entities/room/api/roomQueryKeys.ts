import type { TRoomsListParams } from "../model/types";

export const roomQueryKeys = {
  all: ["rooms"] as const,

  lists: () => [...roomQueryKeys.all, "list"] as const,
  
  list: (params: TRoomsListParams) =>
    [...roomQueryKeys.lists(), params] as const,
};
