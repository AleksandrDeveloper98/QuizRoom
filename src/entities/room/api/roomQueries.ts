import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { TRoomsListParams } from "../model/types";
import { roomQueryKeys } from "./roomQueryKeys";
import { roomApi } from "./roomApi";

export const useRoomsQuery = (params: TRoomsListParams) => {
  return useQuery({
    queryKey: roomQueryKeys.list(params),
    queryFn: () => roomApi.getList(params),

    placeholderData: keepPreviousData,
  });
};

export const useRoomQuery = (roomId: string) => {
  return useQuery({
    queryKey: roomQueryKeys.detail(roomId),
    queryFn: () => roomApi.getById(roomId),
    enabled: Boolean(roomId),
    staleTime: 0,
  });
};
