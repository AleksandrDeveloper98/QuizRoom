import { useJoinRoomByInvite } from "@/features/join-room/model/useJoinRoomByInvite";
import JoinPrivateRoomModal from "@/features/join-room/ui/JoinPrivateRoomModal";
import type { TInviteRoomProps } from "./types";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/constants/routes";

const InviteRoom = (props: TInviteRoomProps) => {
  const { roomId } = props;
  const navigate = useNavigate();

  const {
    isPasswordRequired,
    isPending,
    submitPassword,
    clearPasswordError,
    closePasswordModal,
    join,
    passwordError,
  } = useJoinRoomByInvite(roomId);

  const handleCancel = () => {
    navigate(routes.rooms, { replace: true });
  };

  if (isPasswordRequired) {
    return (
      <JoinPrivateRoomModal
        isPending={isPending}
        onSubmit={submitPassword}
        onPasswordChange={clearPasswordError}
        onClose={closePasswordModal}
        error={passwordError}
      />
    );
  }

  return (
    <Modal
      title="Вас пригласили в игру. Хотите присоединиться?"
      open
      onClose={handleCancel}
      actions={
        <>
          <Button disabled={isPending} onClick={() => join()}>
            {isPending ? "Проверяем..." : "Присоединиться"}
          </Button>
          <Button disabled={isPending} onClick={handleCancel}>
            Отменить
          </Button>
        </>
      }
    />
  );
};

export default InviteRoom;
