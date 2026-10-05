import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { roomQueryKeys } from "@/entities/room/api/roomQueryKeys";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { routes } from "@/shared/constants/routes";
import { useRoomReadyMutation } from "../api/useRoomReadyMutation";


export const useRoomReady = () => {
  const { roomId } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const roomReadyMutation = useRoomReadyMutation();

  const setReady = (ready: boolean) => {
    if (!roomId) {
      return;
    }

    roomReadyMutation.mutate(
      {
        roomId,
        ready,
      },
      {
        onError: (error) => {
          const code = getApiErrorCode(error);

          switch (code) {
            case "ROOM_NOT_FOUND":
              toast.error("Комната больше не существует");

              navigate(routes.rooms, {
                replace: true,
              });
              break;

            case "ROOM_NOT_MEMBER":
              toast.error("Вы больше не состоите в этой комнате");

              navigate(routes.rooms, {
                replace: true,
              });
              break;

            case "HOST_CANNOT_CHANGE_READY":
              toast.error("Вы теперь host комнаты");

              void queryClient.invalidateQueries({
                queryKey: roomQueryKeys.detail(roomId),
              });
              break;

            case "ROOM_ALREADY_PLAYING":
              toast.error("Игра уже началась");

              void queryClient.invalidateQueries({
                queryKey: roomQueryKeys.detail(roomId),
              });
              break;

            default:
              toast.error(
                "Не удалось изменить статус готовности. Попробуйте позже.",
              );
          }
        },
      },
    );
  };

  return {
    setReady,
    isPending: roomReadyMutation.isPending,
  };
};
