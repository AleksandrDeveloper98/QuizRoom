import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRoomApi } from "./joinRoomApi";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";


export const useJoinRoomMutation = () => {
  const queryClient = useQueryClient();

  const invalidateRooms = () => {
    queryClient.invalidateQueries({
      queryKey: roomQueryKeys.lists(),
    });
  };

  return useMutation({
    mutationFn: joinRoomApi.join,

    onSuccess: () => {
      void invalidateRooms();
    },

    onError: (error) => {
      const code = getApiErrorCode(error);

      if (
        code === "ROOM_FULL" ||
        code === "ROOM_ALREADY_PLAYING" ||
        code === "ROOM_NOT_FOUND"
      ) {
        void invalidateRooms();
      }
    },
  });
};
