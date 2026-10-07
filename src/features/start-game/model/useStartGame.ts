import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { routes } from "@/shared/constants/routes";

import { useStartGameMutation } from "../api/startGameMutation";

export const useStartGame = () => {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const startGameMutation = useStartGameMutation();

  const startGame = () => {
    if (!roomId) {
      return;
    }

    startGameMutation.mutate(roomId, {
      onSuccess: ({ gameId }) => {
        navigate(routes.gameById(gameId), {
          replace: true,
        });
      },

      onError: (error) => {
        const code = getApiErrorCode(error);

        switch (code) {
          case "ROOM_NOT_FOUND":
            toast.error("Комната больше не существует");
            navigate(routes.rooms, { replace: true });
            break;

          case "ROOM_NOT_MEMBER":
            toast.error("Вы больше не состоите в этой комнате");
            navigate(routes.rooms, { replace: true });
            break;

          case "ONLY_HOST_CAN_START":
            toast.error("Вы больше не являетесь host комнаты");
            break;

          case "NOT_ENOUGH_PLAYERS":
            toast.error("Для начала игры нужно минимум 2 игрока");
            break;

          case "PLAYERS_NOT_READY":
            toast.error("Не все игроки готовы");
            break;

          case "ROOM_ALREADY_PLAYING":
            toast.error("Игра уже началась");
            break;

          case "NOT_ENOUGH_QUESTIONS":
            toast.error("Для выбранных настроек недостаточно вопросов");
            break;

          default:
            toast.error("Не удалось начать игру. Попробуйте позже.");
        }
      },
    });
  };

  return {
    startGame,
    isPending: startGameMutation.isPending,
  };
};
