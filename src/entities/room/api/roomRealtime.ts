import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
  TGameStartedPayload,
  TRoomIdPayload,
} from "@/shared/api/socket/types";
import { socket } from "@/shared/api/socket/socket";
import { roomQueryKeys } from "./roomQueryKeys";

export const useRoomsRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribe = () => {
      socket.emit("rooms:subscribe");
    };

    const handleRoomsUpdated = () => {
      void queryClient.invalidateQueries({
        queryKey: roomQueryKeys.lists(),
      });
    };

    socket.on("connect", subscribe);

    socket.on("rooms:updated", handleRoomsUpdated);

    if (socket.connected) {
      subscribe();
    }

    return () => {
      if (socket.connected) {
        socket.emit("rooms:unsubscribe");
      }

      socket.off("connect", subscribe);

      socket.off("rooms:updated", handleRoomsUpdated);
    };
  }, [queryClient]);
};

export const useRoomRealtime = (roomId: string) => {
  const [startedGameId, setStartedGameId] =
    useState<TGameStartedPayload | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const subscribe = () => {
      socket.emit("room:subscribe", {
        roomId,
      });
    };

    const invalidateRoom = () =>
      queryClient.invalidateQueries({
        queryKey: roomQueryKeys.detail(roomId),
      });

    const handleConnect = () => {
      subscribe();

      void invalidateRoom();
    };

    const handleRoomUpdated = (payload: TRoomIdPayload) => {
      if (payload.roomId !== roomId) {
        return;
      }

      void invalidateRoom();
    };

    const handleGameStarted = (payload: TGameStartedPayload) => {
      if (payload.roomId !== roomId) {
        return;
      }

      setStartedGameId(payload);
    };

    socket.on("connect", handleConnect);

    socket.on("room:updated", handleRoomUpdated);

    socket.on("game:started", handleGameStarted);

    if (socket.connected) {
      subscribe();
    }

    return () => {
      if (socket.connected) {
        socket.emit("room:unsubscribe", { roomId });
      }

      socket.off("connect", handleConnect);

      socket.off("room:updated", handleRoomUpdated);

      socket.off("game:started", handleGameStarted);
    };
  }, [queryClient, roomId]);

  return {
    startedGameId:
      startedGameId?.roomId === roomId ? startedGameId.gameId : null,
  };
};
