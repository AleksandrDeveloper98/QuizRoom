import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/shared/api/socket/socket";
import type { TGameIdPayload } from "@/shared/api/socket/types";
import { gameQueryKeys } from "./gameQueryKeys";

export const useGameRealTime = (gameId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!gameId) {
      return;
    }

    const invalidateGame = () => {
      return queryClient.invalidateQueries({
        queryKey: gameQueryKeys.detail(gameId),
        exact: true,
      });
    };

    const subscribe = () => {
      socket.emit("game:subscribe", { gameId });
    };

    const handleConnect = () => {
      subscribe();

      void invalidateGame();
    };

    const handleGameUpdated = (payload: TGameIdPayload) => {
      if (payload.gameId !== gameId) {
        return;
      }

      void invalidateGame();
    };

    socket.on("connect", handleConnect);
    socket.on("game:updated", handleGameUpdated);

    if (socket.connected) {
      subscribe();
    }

    return () => {
      if (socket.connected) {
        socket.emit("game:unsubscribe", { gameId });
      }

      socket.off("connect", handleConnect);
      socket.off("game:updated", handleGameUpdated);
    };
  }, [queryClient, gameId]);
};
