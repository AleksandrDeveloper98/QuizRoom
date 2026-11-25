import WarningIcon from "@/shared/assets/icons/warning-message-circle.svg?react";
import Button from "../Button";
import type { TErrorMessageProps } from "./types";
import Icon from "../Icon";
import "./ErrorMessage.scss";

const ErrorMessage = (props: TErrorMessageProps) => {
  const {
    title,
    description,
    onRetry,
    isRetrying,
    backTo,
    backLabel,
    replace = true,
  } = props;

  const titleId = "error-message-title";

  return (
    <section className="error-message" aria-labelledby={titleId} role="alert">
      <div className="error-message__inner">
        <Icon className="error-message__icon" size={30} icon={WarningIcon} />
        <h1 className="error-message__title h3" id={titleId}>
          {title}
        </h1>
        {description && (
          <p className="error-message__description">{description}</p>
        )}
        <div className="error-message__actions">
          {onRetry && (
            <Button onClick={onRetry} disabled={isRetrying}>
              {isRetrying ? "Подождите..." : "Повторить"}
            </Button>
          )}
          {backTo && (
            <Button to={backTo} replace={replace}>
              {backLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ErrorMessage;
