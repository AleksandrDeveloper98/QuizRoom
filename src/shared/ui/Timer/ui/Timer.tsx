import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useCountdown } from "../model/useCountdown";
import "./Timer.scss";
import type { TTimerProps } from "./types";

const Timer = (props: TTimerProps) => {
  const { phaseEndsAt, durationSeconds } = props;

  const { seconds, remainingMs } = useCountdown(phaseEndsAt);

  const durationMs = durationSeconds * 1000;

  const progress =
    durationMs > 0
      ? Math.min(100, Math.max(0, (remainingMs / durationMs) * 100))
      : 0;

  return (
    <div className="timer">
      <CircularProgressbarWithChildren
        value={progress}
        strokeWidth={7}
        styles={buildStyles({
          pathColor: seconds > 3 ? "var(--color-violet)" : "var(--color-red)",
          trailColor: "#6c6c6c",
          strokeLinecap: "round",
          pathTransitionDuration: 0.1,
        })}
      >
        <span className="timer__seconds">{seconds}</span>
        <span className="timer__label">сек</span>
      </CircularProgressbarWithChildren>
    </div>
  );
};
export default Timer;
