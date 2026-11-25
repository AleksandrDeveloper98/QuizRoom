import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { TCreateRoom } from "@/entities/room/model/roomSchema";
import { routes } from "@/shared/constants/routes";
import { useCreateRoomFormMutation } from "../api/createRoomFormMutation";

export const useCreateRoomForm = () => {
  const navigate = useNavigate();
  const createRoomMutation = useCreateRoomFormMutation();

  const handleSubmitForm = (data: TCreateRoom) => {
    createRoomMutation.mutate(data, {
      onSuccess: (room) => {
        navigate(routes.roomById(room.id), { replace: true });
      },

      onError: () => {
        toast.error("Не удалось создать комнату");
      },
    });
  };

  return {
    isPending: createRoomMutation.isPending,
    handleSubmitForm,
  };
};
