import Button from "@/shared/ui/Button";
import { useRoomReady } from "../../model/useRoomReady";
import type { TReadyButtonProps } from "./types";
import BlockingLoader from "@/shared/ui/BlockingLoader";

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
