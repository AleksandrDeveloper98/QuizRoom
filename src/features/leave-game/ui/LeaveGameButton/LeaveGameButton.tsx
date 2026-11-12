import Button from "@/shared/ui/Button";
import BlockingLoader from "@/shared/ui/BlockingLoader";
import { useLeaveGame } from "../../model/useLeaveGame";

const LeaveGameButton = () => {
  const { leaveGame, isPending } = useLeaveGame();

  return (
    <>
      <Button disabled={isPending} onClick={leaveGame}>
        {isPending ? "Подождите" : "Выйти из игры"}
      </Button>
      {isPending && <BlockingLoader />}
    </>
  );
};

export default LeaveGameButton;
