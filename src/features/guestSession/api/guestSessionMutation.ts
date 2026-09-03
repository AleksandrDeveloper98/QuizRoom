import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guestSessionApi } from "./guestSessionApi";
import { guestPlayerQueryKeys } from "@/entities/guestPlayer/api/guestPlayerQueryKeys";

export const useCreateGuestSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guestSessionApi.create,

    onSuccess: (player) => {
      queryClient.setQueryData(guestPlayerQueryKeys.current(), player);
    },
  });
};

export const useLogoutGuestSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guestSessionApi.delete,

    onSuccess: () => {
      queryClient.setQueryData(guestPlayerQueryKeys.current(), null);
    },
  });
};
