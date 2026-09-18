import clsx from "clsx";
import "./Field.scss";
import type { TFieldProps } from "./types";
import { forwardRef } from "react";

const Field = forwardRef<HTMLInputElement, TFieldProps>((props, ref) => {
  const {
    id,
    label,
    hiddenLabel = false,
    type = "text",
    error,
    required,
    inputClassName,

    ...inputProps
  } = props;

  const errorId = error ? `error-${id}` : undefined;

  return (
    <div className="field">
      {label && (
        <label
          className={clsx("field__label", hiddenLabel && "visually-hidden")}
          htmlFor={id}
        >
          {label}
          {required && <span className="field__required">*</span>}
        </label>
      )}
      <input
        className={clsx(
          "field__input",
          inputClassName,
          error && "field__input--error",
        )}
        id={id}
        type={type}
        required={required}
        aria-describedby={errorId}
        aria-required={required}
        aria-invalid={Boolean(error)}
        ref={ref}
        {...inputProps}
      />

      {error && (
        <span className="field__error" id={errorId}>
          {error ?? ""}
        </span>
      )}
    </div>
  );
});

export default Field;
