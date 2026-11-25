import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomApi } from "./updateRoomApi";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoomApi.update,

    onSuccess: (room, { roomId }) => {
      queryClient.setQueryData(roomQueryKeys.detail(roomId), room);

      void queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    },

    onError: (error, { roomId }) => {
      const code = getApiErrorCode(error);

      switch (code) {
        case "ONLY_HOST_CAN_UPDATE_ROOM":
        case "ROOM_ALREADY_STARTING":
        case "ROOM_ALREADY_PLAYING":
        case "ROOM_MAX_PLAYERS_TOO_SMALL":
          queryClient.invalidateQueries({
            queryKey: roomQueryKeys.detail(roomId),
          });
          break;
        case "ROOM_NOT_FOUND":
          queryClient.invalidateQueries({
            queryKey: roomQueryKeys.lists(),
          });
          break;
        case "SESSION_NOT_FOUND":
          queryClient.removeQueries({
            queryKey: roomQueryKeys.all,
          });
          break;
      }
    },
  });
};
