import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { gameApi } from "@/entities/game/api/gameApi";
import { gameQueryKeys } from "@/entities/game/api/gameQueryKeys";
import type { TSubmitAnswerVariables } from "@/entities/game/model/types";
import { guestPlayerQueryKeys } from "@/entities/guestPlayer/api/guestPlayerQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";

export const useSubmitAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: TSubmitAnswerVariables) =>
      gameApi.submitAnswer(variables),

    retry: false,

    onSuccess: (_data, { gameId }) => {
      return queryClient.invalidateQueries({
        queryKey: gameQueryKeys.detail(gameId),
      });
    },

    onError: (error, { gameId }) => {
      const code = getApiErrorCode(error);

      switch (code) {
        case "ANSWER_WINDOW_CLOSED":
        case "QUESTION_NOT_ACTIVE":
        case "ANSWER_ALREADY_SUBMITTED":
          queryClient.invalidateQueries({
            queryKey: gameQueryKeys.detail(gameId),
          });
          break;

        case "NOT_GAME_PLAYER":
        case "GAME_NOT_FOUND":
          queryClient.removeQueries({
            queryKey: gameQueryKeys.detail(gameId),
          });
          break;
        case "SESSION_NOT_FOUND":
          queryClient.setQueryData(guestPlayerQueryKeys.current(), null);

          queryClient.removeQueries({
            queryKey: gameQueryKeys.all,
          });

          queryClient.removeQueries({
            queryKey: roomQueryKeys.all,
          });
          break;

        default:
          return queryClient.invalidateQueries({
            queryKey: gameQueryKeys.detail(gameId),
          });
      }
    },
  });
};
