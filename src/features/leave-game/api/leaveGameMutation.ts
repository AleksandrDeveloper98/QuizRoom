import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameQueryKeys } from "@/entities/game/api/gameQueryKeys";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { leaveGameApi } from "./leaveGameApi";
import { guestPlayerQueryKeys } from "@/entities/guestPlayer/api/guestPlayerQueryKeys";

export const useLeaveGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveGameApi.leaveGameById,

    onSuccess: (_data, gameId) => {
      queryClient.removeQueries({
        queryKey: gameQueryKeys.detail(gameId),
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    },

    onError: (error, gameId) => {
      const code = getApiErrorCode(error);

      switch (code) {
        case "NOT_GAME_PLAYER":
        case "GAME_NOT_FOUND":
          queryClient.removeQueries({
            queryKey: gameQueryKeys.detail(gameId),
            exact: true,
          });
          break;
        case "SESSION_NOT_FOUND":
          queryClient.setQueryData(guestPlayerQueryKeys.current(), null);
          break;
      }
    },
  });
};
