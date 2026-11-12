import { useNavigate, useParams } from "react-router-dom";
import { useLeaveGameMutation } from "../api/leaveGameMutation";
import { routes } from "@/shared/constants/routes";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import toast from "react-hot-toast";

export const useLeaveGame = () => {
  const { gameId } = useParams();
  const leaveGameMutation = useLeaveGameMutation();

  const navigate = useNavigate();

  const leaveGame = () => {
    if (!gameId) {
      return;
    }

    leaveGameMutation.mutate(gameId, {
      onSuccess: () => {
        navigate(routes.rooms, { replace: true });
      },
      onError: (error) => {
        const code = getApiErrorCode(error);

        switch (code) {
          case "SESSION_NOT_FOUND":
            toast.error("Время сессии истекло");
            navigate(routes.welcome, { replace: true });
            break;
          case "NOT_GAME_PLAYER":
            toast.error("Вы больше не являетесь участником игры");
            navigate(routes.rooms, { replace: true });
            break;
          case "GAME_NOT_FOUND":
            toast.error("Комнаты с игрой больше не существует");
            navigate(routes.rooms, { replace: true });
            break;
          case "GAME_ALREADY_FINISHED":
            toast.error("Игра завершилась");
            navigate(routes.rooms, { replace: true });
            break;
          default:
            toast.error("Ошибка сервера");
        }
      },
    });
  };

  return {
    leaveGame,
    isPending: leaveGameMutation.isPending,
  };
};
