import { useState } from "react";
import Modal from "@/shared/ui/Modal";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import type { TJoinPrivateRoomModalProps } from "./types";

const JoinPrivateRoomModal = (props: TJoinPrivateRoomModalProps) => {
  const { roomName, onClose, onSubmit, isPending, error } = props;
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const normalizedPassword = password.trim();

    if (!normalizedPassword) {
      return;
    }

    onSubmit(normalizedPassword);
  };

  return (
    <Modal
      title={`Введите пароль от комнаты ${roomName}`}
      onClose={onClose}
      closeDisabled={isPending}
      children={
        <Field
          id="password"
          label="Пароль"
          hiddenLabel
          type="password"
          error={error}
          disabled={isPending}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      }
      actions={
        <>
          <Button disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Подождите..." : "Войти"}
          </Button>
          <Button disabled={isPending} onClick={onClose}>
            Отмена
          </Button>
        </>
      }
    />
  );
};

export default JoinPrivateRoomModal;
