import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { TSubmitAnswerPayload } from "@/entities/game/model/types";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { routes } from "@/shared/constants/routes";
import { useSubmitAnswerMutation } from "../api/useSubmitAnswerMutation";

export const useSubmitAnswer = (gameId: string) => {
  const submitAnswerMutation = useSubmitAnswerMutation();
  const navigate = useNavigate();

  const submitAnswer = (payload: TSubmitAnswerPayload) => {
    if (!gameId) {
      return;
    }
    submitAnswerMutation.mutate(
      { gameId, payload },
      {
        onError: (error) => {
          const code = getApiErrorCode(error);

          switch (code) {
            case "ANSWER_WINDOW_CLOSED":
              toast.error("Время ответа истекло");
              break;
            case "QUESTION_NOT_ACTIVE":
              toast.error("Вопрос уже сменился");
              break;
            case "ANSWER_ALREADY_SUBMITTED":
              toast.error("Ответ уже принят");
              break;

            case "NOT_GAME_PLAYER":
              toast.error("Вы больше не участвуете в игре");
              navigate(routes.rooms, { replace: true });
              break;
            case "GAME_NOT_FOUND":
              toast.error("Игра не найдена");
              navigate(routes.rooms, { replace: true });
              break;
            case "SESSION_NOT_FOUND":
              toast.error("Сессия истекла");
              break;
            default:
              toast.error(
                "Не удалось подтвердить ответ. Проверяем состояние игры.",
              );
          }
        },
      },
    );
  };

  return {
    isSubmitting: submitAnswerMutation.isPending,
    submitAnswer,
  };
};
