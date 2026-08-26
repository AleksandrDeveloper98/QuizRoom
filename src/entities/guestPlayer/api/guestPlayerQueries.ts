import { useQuery } from "@tanstack/react-query";
import { guestPlayerQueryKeys } from "./guestPlayerQueryKeys";
import { guestPlayerApi } from "./guestPlayerApi";

export const useCurrentGuestPlayer = () => {
  return useQuery({
    queryKey: guestPlayerQueryKeys.current(),
    queryFn: guestPlayerApi.getCurrent,
  });
};
