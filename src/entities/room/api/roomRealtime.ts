import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
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

    const handleRoomUpdated = (payload: { roomId: string }) => {
      if (payload.roomId !== roomId) {
        return;
      }
      
      void queryClient.invalidateQueries({
        queryKey: roomQueryKeys.detail(roomId),
      });
    };

    socket.on("connect", subscribe);

    socket.on("room:updated", handleRoomUpdated);

    if (socket.connected) {
      subscribe();
    }

    return () => {
      if (socket.connected) {
        socket.emit("room:unsubscribe", { roomId });
      }

      socket.off("connect", subscribe);

      socket.off("room:updated", handleRoomUpdated);
    };
  }, [queryClient, roomId]);
};
