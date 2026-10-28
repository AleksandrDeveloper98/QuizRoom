import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { startGameApi } from "./startGameApi";

export const useStartGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startGameApi.startGame,

    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      }),

    onError: (error, roomId) => {
      const code = getApiErrorCode(error);

      switch (code) {
        case "ONLY_HOST_CAN_START":
        case "NOT_ENOUGH_PLAYERS":
        case "PLAYERS_NOT_READY":
        case "ROOM_ALREADY_PLAYING":
          void queryClient.invalidateQueries({
            queryKey: roomQueryKeys.detail(roomId),
          });
          break;
      }
    },
  });
};
