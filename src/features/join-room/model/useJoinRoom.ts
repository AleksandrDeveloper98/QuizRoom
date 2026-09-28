import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import type { TRoomListItem } from "@/entities/room/model/roomListItemSchema";
import { routes } from "@/shared/constants/routes";

import { getJoinRoomErrorCode } from "./getJoinRoomErrorCode";
import { useJoinRoomMutation } from "../api/joinRoomMutation";

export const useJoinRoom = () => {
  const navigate = useNavigate();

  const joinRoomMutation = useJoinRoomMutation();

  const [privateRoom, setPrivateRoom] = useState<TRoomListItem | null>(null);

  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const pendingRoomId = joinRoomMutation.isPending
    ? (joinRoomMutation.variables?.roomId ?? null)
    : null;

  const performJoin = (room: TRoomListItem, password?: string) => {
    if (joinRoomMutation.isPending) {
      return;
    }

    setPasswordError(undefined);

    joinRoomMutation.mutate(
      {
        roomId: room.id,
        password,
      },
      {
        onSuccess: () => {
          setPrivateRoom(null);

          navigate(routes.roomById(room.id));
        },

        onError: (error) => {
          const code = getJoinRoomErrorCode(error);

          switch (code) {
            case "INVALID_ROOM_PASSWORD":
              setPasswordError("Неверный пароль");
              break;

            case "ROOM_FULL":
              setPrivateRoom(null);
              toast.error("Комната уже заполнена");
              break;

            case "ROOM_ALREADY_PLAYING":
              setPrivateRoom(null);
              toast.error("Игра в комнате уже началась");
              break;

            case "ROOM_NOT_FOUND":
              setPrivateRoom(null);
              toast.error("Комната больше не существует");
              break;

            default:
              toast.error("Не удалось войти в комнату. Попробуйте позже.");
          }
        },
      },
    );
  };

  const join = (room: TRoomListItem) => {
    if (joinRoomMutation.isPending) {
      return;
    }

    if (room.access === "private") {
      setPasswordError(undefined);
      setPrivateRoom(room);
      return;
    }

    performJoin(room);
  };

  const submitPassword = (password: string) => {
    if (!privateRoom) {
      return;
    }

    performJoin(privateRoom, password);
  };

  const closePrivateRoomModal = () => {
    if (joinRoomMutation.isPending) {
      return;
    }
    setPrivateRoom(null);
    setPasswordError(undefined);
  };

  const clearPasswordError = () => {
    setPasswordError(undefined);
  };

  return {
    join,

    privateRoom,
    passwordError,

    submitPassword,
    closePrivateRoomModal,
    clearPasswordError,
    pendingRoomId,

    isPendingJoinRoom: joinRoomMutation.isPending,
  };
};
