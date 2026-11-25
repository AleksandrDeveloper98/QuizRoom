import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import type { TCreateRoom } from "@/entities/room/model/roomSchema";
import { createRoomFormApi } from "./createRoomFormApi";

export const useCreateRoomFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: TCreateRoom) => createRoomFormApi.create(room),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    },
  });
};
