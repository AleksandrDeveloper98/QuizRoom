import Button from "@/shared/ui/Button";
import { useLeaveRoom } from "../../model/useLeaveRoom";

const LeaveRoomButton = () => {
  const { leaveRoom, isPending } = useLeaveRoom();

  return (
    <Button disabled={isPending} onClick={leaveRoom}>
      {isPending ? "Подождите..." : "Выйти из комнаты"}
    </Button>
  );
};

export default LeaveRoomButton;
