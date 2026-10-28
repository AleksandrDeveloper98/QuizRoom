import Button from "@/shared/ui/Button";
import BlockingLoader from "@/shared/ui/BlockingLoader";
import { useRoomReady } from "../../model/useRoomReady";
import type { TReadyButtonProps } from "./types";

const ReadyButton = (props: TReadyButtonProps) => {
  const { isReady } = props;

  const { setReady, isPending } = useRoomReady();

  const buttonText = isPending
    ? "Подождите..."
    : isReady
      ? "Не готов"
      : "Готов";

  return (
    <>
      <Button disabled={isPending} onClick={() => setReady(!isReady)}>
        {buttonText}
      </Button>
      {isPending && <BlockingLoader />}
    </>
  );
};

export default ReadyButton;
