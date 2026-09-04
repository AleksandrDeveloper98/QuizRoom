import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { roomQueryKeys } from "./roomQueryKeys";
import type { TRoomsListParams } from "../model/types";
import { roomApi } from "./roomApi";

export const useRoomsQuery = (params: TRoomsListParams) => {
  return useQuery({
    queryKey: roomQueryKeys.list(params),
    queryFn: () => roomApi.getList(params),

    placeholderData: keepPreviousData,
  });
};
