import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { roomReadyApi } from "./roomReadyApi";

export const useRoomReadyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomReadyApi.setReady,

    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({
        queryKey: roomQueryKeys.detail(variables.roomId),
      }),
  });
};
