import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { routes } from "@/shared/constants/routes";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { useJoinRoomMutation } from "../api/joinRoomMutation";

export const useJoinRoomByInvite = (roomId: string) => {
  const navigate = useNavigate();
  const joinRoomMutation = useJoinRoomMutation();

  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  const [passwordError, setPasswordError] = useState<string | undefined>();

  const redirectToRooms = (message: string) => {
    toast.error(message);
    navigate(routes.rooms, { replace: true });
  };

  const join = (password?: string) => {
    if (joinRoomMutation.isPending) {
      return;
    }

    setPasswordError(undefined);

    joinRoomMutation.mutate(
      {
        roomId,
        password,
      },
      {
        onSuccess: () => {
          navigate(routes.roomById(roomId), {
            replace: true,
          });
        },

        onError: (error) => {
          const code = getApiErrorCode(error);

          switch (code) {
            case "INVALID_ROOM_PASSWORD":
              setIsPasswordRequired(true);

              if (password) {
                setPasswordError("Неверный пароль");
              }

              break;

            case "ROOM_FULL":
              redirectToRooms("Комната уже заполнена");
              break;

            case "ROOM_ALREADY_PLAYING":
              redirectToRooms("Игра в комнате уже началась");
              break;

            case "ROOM_NOT_FOUND":
              redirectToRooms("Комната больше не существует");
              break;

            default:
              redirectToRooms("Не удалось войти в комнату. Попробуйте позже.");
          }
        },
      },
    );
  };

  const submitPassword = (password: string) => {
    join(password);
  };

  const clearPasswordError = () => {
    setPasswordError(undefined);
  };

  const closePasswordModal = () => {
    if (joinRoomMutation.isPending) {
      return;
    }

    setIsPasswordRequired(false);
    setPasswordError(undefined);
  };

  return {
    join,
    submitPassword,

    isPasswordRequired,
    passwordError,
    clearPasswordError,
    closePasswordModal,

    isPending: joinRoomMutation.isPending,
  };
};
