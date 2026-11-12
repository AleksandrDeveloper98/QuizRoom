import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guestPlayerQueryKeys } from "@/entities/guestPlayer/api/guestPlayerQueryKeys";
import { guestSessionApi } from "./guestSessionApi";
import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { gameQueryKeys } from "@/entities/game/api/gameQueryKeys";

export const useCreateGuestSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guestSessionApi.create,

    onSuccess: (player) => {
      queryClient.setQueryData(guestPlayerQueryKeys.current(), player);
      
      queryClient.removeQueries({
        queryKey: roomQueryKeys.all,
      });

      queryClient.removeQueries({
        queryKey: gameQueryKeys.all,
      });
    },
  });
};

export const useLogoutGuestSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guestSessionApi.delete,

    onSuccess: () => {
      queryClient.setQueryData(guestPlayerQueryKeys.current(), null);

      queryClient.removeQueries({
        queryKey: roomQueryKeys.all,
      });

      queryClient.removeQueries({
        queryKey: gameQueryKeys.all,
      });
    },
  });
};
