import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TCreateRoom } from "../model/roomSchema";
import { roomApi } from "./roomApi";
import { roomQueryKeys } from "./roomQueryKeys";

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: TCreateRoom) => roomApi.create(room),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    },
  });
};
