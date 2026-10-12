import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { leaveRoomApi } from "./leaveRoomApi";

export const useLeaveRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveRoomApi.leaveRoomById,

    onSuccess: (_data, roomId) => {
      queryClient.removeQueries({
        queryKey: roomQueryKeys.detail(roomId),
        exact: true,
      });

      void queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    },
  });
};
