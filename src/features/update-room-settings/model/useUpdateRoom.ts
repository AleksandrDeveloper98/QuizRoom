import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { useUpdateRoomMutation } from "../api/updateRoomMutation";
import type { TUpdateRoomVariables } from "./types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/constants/routes";

export const useUpdateRoom = () => {
  const updateRoomMutation = useUpdateRoomMutation();
  const navigate = useNavigate();

  const handleUpdateRoom = (payload: TUpdateRoomVariables) => {
    updateRoomMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Настройки комнаты обновлены");
        navigate(routes.roomById(payload.roomId));
      },
      onError: (error, { roomId }) => {
        const code = getApiErrorCode(error);

        switch (code) {
          case "ROOM_PASSWORD_REQUIRED":
            toast.error("Нужен пароль для приватной комнаты");
            break;
          case "ROOM_PASSWORD_NOT_ALLOWED":
            toast.error("Пароль указан для публичной комнаты");
            break;
          case "ONLY_HOST_CAN_UPDATE_ROOM":
            toast.error("Изменять настройки пытается не Host");
            navigate(routes.roomById(roomId), { replace: true });
            break;
          case "ROOM_NOT_FOUND":
            toast.error("Комната не найдена или закрыта");
            navigate(routes.rooms, { replace: true });
            break;
          case "ROOM_ALREADY_STARTING":
            toast.error("Игра запускается");
            break;
          case "ROOM_ALREADY_PLAYING":
            toast.error("Игра уже идёт");
            break;
          case "ROOM_MAX_PLAYERS_TOO_SMALL":
            toast.error("Новый лимит меньше числа игроков");
            break;
          case "ROOM_UPDATE_FAILED":
            toast.error("Не удалось сохранить изменения");
            break;
          default:
            toast.error("Не удалось обновить настройки комнаты");
        }
      },
    });
  };

  return {
    isPending: updateRoomMutation.isPending,
    handleUpdateRoom,
  };
};
