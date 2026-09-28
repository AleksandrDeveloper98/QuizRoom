import { useForm } from "react-hook-form";
import Modal from "@/shared/ui/Modal";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import type { TJoinPrivateRoomModalProps } from "./types";
import {
  roomPasswordSchema,
  type TRoomPassword,
} from "@/entities/room/model/roomPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import "./JoinPrivateRoomModal.scss";

const JoinPrivateRoomModal = (props: TJoinPrivateRoomModalProps) => {
  const { roomName, onClose, onSubmit, isPending, error, onPasswordChange } =
    props;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TRoomPassword>({
    resolver: zodResolver(roomPasswordSchema),
    defaultValues: { password: "" },
  });

  const submit = (data: TRoomPassword) => {
    onSubmit(data.password);
  };

  return (
    <Modal
      title={
        roomName
          ? `Введите пароль от комнаты ${roomName}`
          : "Введите пароль от комнаты"
      }
      open
      onClose={onClose}
    >
      <form className="join-private-room-modal" onSubmit={handleSubmit(submit)}>
        <Field
          {...register("password", { onChange: onPasswordChange })}
          id="password"
          label="Пароль"
          hiddenLabel
          type="password"
          error={errors.password?.message ?? error}
          disabled={isPending}
        />
        <div className="join-private-room-modal__actions">
          <Button disabled={isPending} type="submit">
            {isPending ? "Подождите..." : "Войти"}
          </Button>
          <Button disabled={isPending} onClick={onClose}>
            Отмена
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinPrivateRoomModal;
