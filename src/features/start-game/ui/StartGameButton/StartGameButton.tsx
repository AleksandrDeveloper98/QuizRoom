import Button from "@/shared/ui/Button";
import BlockingLoader from "@/shared/ui/BlockingLoader";
import { useStartGame } from "../../model/useStartGame";
import type { TStartGameButtonProps } from "./types";

const StartGameButton = (props: TStartGameButtonProps) => {
  const { canStartGame } = props;
  const { startGame, isPending } = useStartGame();

  return (
    <>
      <Button onClick={startGame} disabled={isPending || !canStartGame}>
        {isPending ? "Подождите..." : "Начать игру"}
      </Button>
      {isPending && <BlockingLoader />}
    </>
  );
};

export default StartGameButton;
