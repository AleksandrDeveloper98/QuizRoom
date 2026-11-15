import { useEffect, useState } from "react";

export const useCountdown = (phaseEndsAt: string) => {
  const [timeNow, setTimeNow] = useState(() => Date.now());

  useEffect(() => {
    const updateTime = () => {
      setTimeNow(Date.now());
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [phaseEndsAt]);

  const deadline = Date.parse(phaseEndsAt);

  const remainingMs = Math.max(0, deadline - timeNow);

  const seconds = Math.ceil(remainingMs / 1000);

  return {
    seconds,
    remainingMs,
  };
};
