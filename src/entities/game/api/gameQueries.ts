import { useQuery } from "@tanstack/react-query";
import { gameQueryKeys } from "./gameQueryKeys";
import { gameApi } from "./gameApi";

export const useGameQuery = (gameId: string) => {
  return useQuery({
    queryKey: gameQueryKeys.detail(gameId),
    queryFn: () => gameApi.getById(gameId),
    enabled: Boolean(gameId),
    staleTime: 0,
  });
};
