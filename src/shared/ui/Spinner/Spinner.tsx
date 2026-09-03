import clsx from "clsx";
import "./Spinner.scss";
import type { TSpinnerProps } from "./types";

const Spinner = (props: TSpinnerProps) => {
  const { className, size = "medium" } = props;

  return (
    <span
      aria-label="Загрузка"
      role="status"
      className={clsx(className, "spinner", `spinner--${size}`)}
    />
  );
};

export default Spinner;
