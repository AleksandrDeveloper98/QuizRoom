import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { routes } from "@/shared/constants/routes";
import { getApiErrorCode } from "@/shared/api/getApiErrorCode";
import { useLeaveRoomMutation } from "../api/leaveRoomMutation";

export const useLeaveRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const leaveRoomMutation = useLeaveRoomMutation();

  const leaveRoom = () => {
    if (!roomId) {
      return;
    }

    leaveRoomMutation.mutate(roomId, {
      onSuccess: () => {
        navigate(routes.rooms, { replace: true });
      },
      onError: (error) => {
        const code = getApiErrorCode(error);

        switch (code) {
          case "ROOM_NOT_FOUND":
            toast.error("Комната больше не существует");
            navigate(routes.rooms, { replace: true });
            break;

          case "ROOM_LEAVE_NOT_ALLOWED":
            toast.error("Нельзя выйти из комнаты после начала игры");
            break;

          default:
            toast.error("Не удалось выйти из комнаты. Попробуйте позже.");
        }
      },
    });
  };

  return {
    leaveRoom,
    isPending: leaveRoomMutation.isPending,
  };
};
